import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

const baseUrl = process.env.BASE_URL

export const ConfirmResetPasswordEmail = () => {
  const updatedDate = new Date(Date.now())
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate)

  return (
    <Html>
      <Head />
      <Preview>You updated the password for your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={`${baseUrl}/logo.png`} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi ,</Text>
            <Text style={paragraph}>
              You updated the password for your account on {formattedDate}. If
              this was you, then no further action is required.
            </Text>
            <Text style={paragraph}>
              However if you did NOT perform this password change, please
              <Link href={`${baseUrl}/forgot-password`} style={link}>
                {" "}
                reset your account password
              </Link>{" "}
              immediately.
            </Text>
            <Text style={paragraph}>
              Remember to use a password that is both strong and unique to your
              account. To learn more about how to create a strong and unique
              password,
            </Text>

            <Text style={paragraph}>
              Thanks,
              <br />
              Support Team
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Text style={{ textAlign: "center", color: "#706a7b" }}>
            © {new Date().getFullYear()} , All Rights Reserved <br />
            on the internet
          </Text>
        </Section>
      </Body>
    </Html>
  )
}

export default ConfirmResetPasswordEmail

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif"

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
}

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
}

const container = {
  width: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
}

const footer = {
  width: "580px",
  margin: "0 auto",
}

const content = {
  padding: "5px 50px 10px 60px",
}

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
}

const sectionsBorders = {
  width: "100%",
  display: "flex",
}

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
}

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
}

const link = {
  textDecoration: "underline",
}
