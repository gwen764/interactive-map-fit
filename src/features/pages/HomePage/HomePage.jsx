import { useContext } from "react";
import SchoolIcon from '@mui/icons-material/School';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import HubIcon from '@mui/icons-material/Hub';
import HistoryIcon from '@mui/icons-material/History';

import { acredationsRoute, mapRoute, mapEntityVersionsRoute, topicsRoute } from "@core/utils/routesUtils"
import { SemesterContext } from "@core/context/SemesterContext";
import { DescriptionCard } from '@components/layout'
import { Header } from "@components/layout";

import CirclePackingImg from "@assets/images/circlePacking.PNG"
import ForceGraphImg from "@assets/images/force.png"
import HullsImg from "@assets/images/hulls.PNG"
import MetroImg from "@assets/images/metro.PNG"

const uuid = require('react-uuid')

/**
 * Page component for the home page.
 * @memberof Features.Pages
 * @return {JSX.Element} JSX Element to be rendered.
 */
const HomePage = () => {
  const semesterContext = useContext(SemesterContext)
  
  const styles = {
    cardsContainer : {
      display: "flex",
      columnGap: "48px",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px"
    },
    card : {
      width : 330,
      height : 430
    }
  }

  const cards = [
    {
      icon: <SchoolIcon/>,
      title: "Studium",
      description: "Přehled akreditací v semestru. Zobrazuje hierarchický pohled přes úrovně studia, programy, specializace, studijní plány a předměty specializací.",
      link: acredationsRoute(),
      image: CirclePackingImg
    },
    {
      icon: <BookmarksIcon/>,
      title: "Témata",
      description: "Zobrazení souvislosti témat v předmětech. Témata navazují hranu pokud se vyskytují ve stejném předmětu.",
      link: topicsRoute(),
      image: HullsImg
    },
    {
      icon: <HubIcon/>,
      title: "Entity",
      description: "Detailní pohled na relace entity v semestru. Entita představuje předměty, vyučující, témata, studijní plány a katedry.",
      link: mapRoute(semesterContext.semester),
      image: ForceGraphImg
    },
    {
      icon: <HistoryIcon/>,
      title: "Verze",
      description: "Detailní pohled na verze entity. Zobrazuje vývoj verzí entity přes semestry v akreditacích, včetně sloučení a rozdělení entit.",
      link: mapEntityVersionsRoute(semesterContext.semester, 320),
      image: MetroImg
    },
  ]

  return (
    <>
      <Header
        title="Interaktivní mapa FIT ČVUT"
        subtitle="v0.0.1"/>
      <div className='home-cards-container'
        style={styles.cardsContainer}>
        {cards.map((card) => {
          const header = 
          <>
            {card.icon}
            <h2>{card.title}</h2>
          </>;

          return (
            <DescriptionCard
              key={uuid()}
              width={styles.card.width}
              height={styles.card.height}
              header={header}
              description={card.description}
              image={card.image}
              link={card.link}/>)})}
      </div>
    </>
  )
}

export default HomePage