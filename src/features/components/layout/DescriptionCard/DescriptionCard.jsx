import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { CardActionArea, CardMedia } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

/**
 * React component for a description card.
 * 
 * @memberof Features.Components.Layouts
 * @param {Object} props - The props object.
 * @param {number} [props.width=400] - The width of the card in pixels.
 * @param {number} [props.height=400] - The height of the card in pixels.
 * @param {ReactNode} [props.header=<></>] - The content to display in the header of the card.
 * @param {string} [props.description="Card description"] - The description text to display on the card.
 * @param {string} [props.link="/"] - The link to which the card should navigate.
 * @param {string} [props.image=""] - The URL of the image to display on the card.
 * @returns {JSX.Element} - A React card element with the specified width, height, header, description, link, and image.
 */
const DescriptionCard = ({ width, height, header, description, link, image }) => {
    const styles = {
        card: {
            width: width,
            height: height
        },
        cardHeader: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "16px",
        },
        cardMedia: {
            height: 200,
            maxWidth: "65%"
        },
        cardImage: {
            display: "flex",
            justifyContent: "center",
            height: 200
        }
    }
    return (
        <Card sx={styles.card}>
            <CardActionArea
                component={Link}
                to={link}>
                <CardContent sx={styles.cardHeader}>
                    {header}
                </CardContent>
                <div className='card-image'
                    style={styles.cardImage}>
                    {image &&
                        <CardMedia
                            component="img"
                            image={image}
                            sx={styles.cardMedia} />
                    }
                </div>
                <CardContent>
                    {description}
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

DescriptionCard.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    header: PropTypes.node,
    description: PropTypes.string,
    link: PropTypes.string,
    image: PropTypes.string.isRequired
}

DescriptionCard.defaultProps = {
    width: 400,
    height: 400,
    header: <></>,
    description: "Card description",
    link: "/",
    image: ""
}

export default DescriptionCard