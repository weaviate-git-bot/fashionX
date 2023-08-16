import './globals.css'
import ThemeProvider from "../components/ThemeProvider"
import ThemeWrapper from "../components/ThemeWrapper"
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import { Carousel } from '../components/CarouselProducts'
import { Footer } from "../components/layout/Footer"



export const metadata = {
  title: 'FASHION - X',
  description: 'Supercharge your fashion store with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <ThemeProvider>


        <Navbar>
          <ThemeWrapper>
            {children}
            <Footer />
          </ThemeWrapper>
        </Navbar >

      </ThemeProvider>

    </html >
  )
}
