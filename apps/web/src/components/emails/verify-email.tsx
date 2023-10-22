import { siteConfig } from "@/config/site"
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

interface verifyEmailProps {
  token: string
}

const baseUrl = process.env.BASE_URL

export const VerifyEmail = ({ token }: verifyEmailProps) => (
  <Html>
    <Head />
    <Preview>{siteConfig.name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.svg`}
          width="100"
          height="50"
          alt={siteConfig.name}
          style={logo}
        />
        <Text style={paragraph}>Hi,</Text>
        <Text style={paragraph}>
          Welcome to {siteConfig.name}, {siteConfig.description}
        </Text>
        <Text style={paragraph}>
          To get started, you need to verify your email by clicking the button
          below 👇
        </Text>
        <Section style={btnContainer}>
          <Button
            pX={12}
            pY={12}
            style={button}
            href={`${baseUrl}/verify/${token}`}
          >
            Verify Email
          </Button>
        </Section>

        <Text style={paragraph}>
          or copy the link below 👇 and paste in your browser
        </Text>

        <Link>{`${baseUrl}/verify/${token}`}</Link>
        <Text style={paragraph}>
          Best,
          <br />
          Xeux from {siteConfig.name}
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VerifyEmail

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
