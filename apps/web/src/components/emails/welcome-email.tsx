import { siteConfig } from "@/config/site"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

const baseUrl = process.env.BASE_URL

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Techshop - the place for all your tech gadgets.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="100"
          height="50"
          alt="LinksPark"
          style={logo}
        />
        <Text style={paragraph}>Hi ,</Text>
        <Text style={paragraph}>
          Welcome to TechShop, the place for all your tech gadgets. 😊 We are
          flad to have you join us
        </Text>

        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href={`${baseUrl !== "" ? baseUrl : "localhost:3000"}/dashboard`}
          >
            Get Started
          </Button>
        </Section>

        <Text style={paragraph}>
          Best,
          <br />
          Xeux from {siteConfig.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default WelcomeEmail

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
}

const logo = {
  margin: "0 auto",
  padding: "1rem",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const btnContainer = {
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
}
