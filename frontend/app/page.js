
import { ThreeItemGrid } from "../components/Three-item"
import { Carousel } from "../components/CarouselProducts"
import { Heropage } from "../components/Heropage"
import { Footer } from "../components"


export default function Home() {

  return (
    <div style={{ overflowY: "scroll" }}>
      <Heropage />
      <ThreeItemGrid />
      <Carousel />
    </div>

  )
}
