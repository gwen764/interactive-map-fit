import * as d3 from 'd3'
import PropTypes from 'prop-types'
import { useState, useEffect } from "react"
import { Divider, List, ListItem } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip/Chip';
import Grid from '@mui/material/Grid';

import graphUtils from '@core/utils/graphUtils';

import { CircleBullet } from '@components/graphic';
import { TabContainer } from '@components/containers';
import { ExpandableTable } from '@components/tables';

const _ = require('lodash');

/**
 * Panel component for network graph
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object for the component.
 * @param {number} [props.width] - The width of the panel in pixels.
 * @param {number} [props.height] - The height of the panel in pixels.
 * @param {number} [props.activeClusters] - Whether the clusters are active
 * @param {number} [props.setActiveClusters] - Set clusters active
 * 
 * @returns {JSX.Element} - The JSX element representing the navigation sidebar.
 */
const NetworkClusterPanel = ({ width, height, data, activeClusters, setActiveClusters }) => {
    const [value, setValue] = useState(0);

    const [linkGroup, setLinkGroup] = useState({})
    const [clusterGroup, setClusterGroup] = useState({})

    const tabHeight = 48;
    const domain = [...new Set(data.nodes.map(node => node.cluster))]
    const colorScale = d3.scaleOrdinal(d3.schemeSet2).domain(domain)

    const styles = {
        line: {
            width: "10px",
            height: "0px",
            borderBottom: "1px solid black",
            position: "absolute",
        },
        panelContainer: {
            height: height,
            width: width,
            border: 1,
            borderColor: 'divider',
            background: "white",
            borderRadius: "10px"
        },
        panelTab: {
            minHeight: tabHeight
        },
        toggleSwitch: {
            padding: '16px'
        },
        expandableBox: {
            margin: 1,
            rowGap: 1,
            display: "flex",
            flexDirection: "column"
        }
    }
    const getLinkGroup = (data) => {
        const linkGroup = data.links.reduce((obj, link) => {
            if(!obj[link.source]){
                obj[link.source] = []
            }

            if(!obj[link.target]){
                obj[link.target] = []
            }
            
            obj[link.source].push({ target: link.target,
                                    cluster: _.find(data.nodes, (node) => node.name === link.target).cluster,
                                    values: link.values })

            obj[link.target].push({ target: link.source,
                                    cluster: _.find(data.nodes, (node) => node.name === link.source).cluster,
                                    values: link.values })
            return obj
        }, {})

        return linkGroup
    }

    const getClusterGroup = (data) => {
        return _.groupBy(data.nodes, (node) => node.cluster)
    }

    const updateData = (data) => {
        var filterEdges = graphUtils.initFilterEdges(data, "name")
        var filterNetwork = graphUtils.initFilterNetwork(filterEdges)
        var result = graphUtils.addDegreeCentrality(filterNetwork)
    
        setLinkGroup(getLinkGroup(result))
        setClusterGroup(getClusterGroup(result))
    }

    const tabs = [
        {
            name: "Shluky",
            content:
                <>
                    <div
                        className='toggle-switch'
                        style={styles.toggleSwitch}>
                        <FormControlLabel
                            label={`${activeClusters ? "Skrýt" : "Zobrazit"} shluky`}
                            control={
                                <Switch
                                    checked={activeClusters}
                                    onChange={() => setActiveClusters(!activeClusters)}
                                    inputProps={{ 'aria-label': 'controlled' }} />} />
                    </div>
                    <Divider />
                    <ExpandableTable
                        header={['Obsaženost', 'Shluk', 'Vrcholy']}
                        rows={_.orderBy(Object.keys(clusterGroup), (cluster) => clusterGroup[cluster]?.length / data.nodes.length, ['desc']).map((cluster) => {
                            return {
                                cells:
                                    [
                                        {
                                            body:
                                                <>
                                                    <CircleBullet
                                                        size={15}
                                                        color={colorScale(Number(cluster))} />
                                                        {`${Math.round((clusterGroup[cluster]?.length / data.nodes.length) * 100)} %`}
                                                </>,
                                            align: "left"
                                        },
                                        {
                                            body: _.maxBy(clusterGroup[cluster], (node) => node.degreeCentrality)?.name,
                                            align: "left"
                                        },
                                        {
                                            body: clusterGroup[cluster]?.length,
                                            align: "right"
                                        }
                                    ],
                                expandedContent:
                                    <Box sx={styles.expandableBox}>
                                        {`Vrcholy (${clusterGroup[cluster]?.length})`}
                                            <List disablePadding>
                                            {clusterGroup[cluster]?.map((node) =>
                                            <ListItem disableGutters>
                                                <CircleBullet
                                                    size={15}
                                                    color={colorScale(node.cluster)}/>
                                                    {node.name}
                                            </ListItem>)}
                                        </List>
                                    </Box>
                            }
                        })
                        } />
                </>
        },
        {
            name: "Hrany",
            content:
                <ExpandableTable
                    header={['Vrchol', 'Shluk', 'Hrany']}
                    rows={_.sortBy(data.nodes, (node) => node.cluster).map((node) => {
                        return {
                            cells:
                                [
                                    {
                                        body:
                                            <>
                                                <CircleBullet
                                                    size={15}
                                                    color={colorScale(node.cluster)} />
                                                {node.name}
                                            </>,
                                        align: "left"
                                    },
                                    {
                                        body: _.maxBy(clusterGroup[node.cluster], (node) => node.degreeCentrality)?.name,
                                        align: "left"
                                    },
                                    {
                                        body: linkGroup[node.name]?.length,
                                        align: "right"
                                    }
                                ],
                            expandedContent:
                                <Box sx={styles.expandableBox}>
                                    {`Hrany (${linkGroup[node.name]?.length})`}
                                    {linkGroup[node.name]?.map((link, index) =>
                                    <>
                                            <div>
                                                <CircleBullet
                                                    size={15}
                                                    color={colorScale(link.cluster)}/>
                                                    S <b>{link.target}</b> má {link.values.length} hodnoty: 
                                            </div>
                                            <Grid direction="row" container spacing={1}>
                                            {link.values?.map((value) =>
                                                    <Grid item>
                                                        <Chip label={value}/>
                                                    </Grid>)}
                                            </Grid>
                                            {index !== linkGroup[node.name].length-1 && <Divider/>}
                                    </> 
                                    )}
                                </Box>
                        }
                    })
                    } />
        }
    ]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function allyProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        updateData(data)
    }, [])

    return (
        <div
            className='topic-course-panel'>
            <Box sx={styles.panelContainer}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={styles.panelTab}>
                    {tabs.map((tab, index) =>
                        <Tab key={tab.name} label={tab.name} {...allyProps(index)} />)}
                </Tabs>
                <Divider />
                {tabs.map((tab, index) =>
                    <TabContainer
                        value={value}
                        index={index}
                        height={height - tabHeight - 1}>
                        {tab.content}
                    </TabContainer>)}
            </Box>
        </div>
    )
}

NetworkClusterPanel.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
    visibleClusters: PropTypes.bool,
    setVisibleClusters: PropTypes.func
}

NetworkClusterPanel.defaultProps = {
    width: 400,
    height: 600,
    data: {},
    visibleClusters: false,
    setVisibleClusters: (visible) => { }
}
export default NetworkClusterPanel
