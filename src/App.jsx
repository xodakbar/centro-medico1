import React, { useEffect } from "react";
import { Layout, Menu, Card, Form, Input, Button, Typography, Row, Col } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { motion, useAnimation } from "framer-motion";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default function App() {
  const controls = useAnimation();

  useEffect(() => {
    function handleScroll() {
      const form = document.getElementById("consulta-form");
      if (!form) return;
      const rect = form.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.7 } });
      } else {
        controls.start({ opacity: 0, y: 50 });
      }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f5ff" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          backgroundColor: "#bae7ff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            color: "#096dd9",
            fontWeight: "bold",
            fontSize: 22,
            marginRight: 40,
            userSelect: "none",
          }}
        >
          Centro Médico San Martín
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["inicio"]}
          items={[
            { key: "inicio", label: "Inicio" },
            { key: "servicios", label: "Servicios" },
            { key: "contacto", label: "Contacto" },
          ]}
          style={{ flex: 1, backgroundColor: "transparent" }}
        />
      </Header>

      <Content
        style={{
          padding: "100px 24px 48px",
          maxWidth: 720,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {/* Imagen destacada con URL pública */}
        <motion.img
          src="https://cdn.pixabay.com/photo/2017/03/06/19/27/medical-2122067_1280.jpg"
          alt="Centro médico"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          style={{
            width: "100%",
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            objectFit: "cover",
            maxHeight: 360,
          }}
        />

        {/* Mensaje de bienvenida en Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Card
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              backgroundColor: "white",
              fontSize: 16,
              color: "#172B4D",
            }}
          >
            <Title level={3} style={{ color: "#096dd9", marginBottom: 24 }}>
              Bienvenid@ a Centro Médico San Martín
            </Title>

            <Paragraph>
              <b>Consulta control de peso valor $25.000 pesos</b>, incluye receta y chequeo médico.
            </Paragraph>

            <Paragraph style={{ marginTop: 16 }}>
              <ClockCircleOutlined style={{ color: "#096dd9", marginRight: 8 }} />
              Nuestro horario de atención es de <b>8:00 am a 8:00 pm</b> de lunes a sábado.
            </Paragraph>

            <Paragraph style={{ marginTop: 24, fontWeight: "bold" }}>
              Por favor complete sus datos para la consulta:
            </Paragraph>

            <Row gutter={[12, 16]} style={{ fontWeight: "normal" }}>
              <Col span={24}>
                <UserOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Nombre completo (dos apellidos)
              </Col>
              <Col span={24}>
                <CalendarOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Fecha de nacimiento
              </Col>
              <Col span={24}>
                <MailOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Correo Electrónico
              </Col>
              <Col span={24}>
                <IdcardOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Rut
              </Col>
              <Col span={24}>
                <EnvironmentOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Ciudad
              </Col>
              <Col span={24}>
                <EnvironmentOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Dirección de residencia
              </Col>
              <Col span={24}>
                <PhoneOutlined style={{ color: "#096dd9", marginRight: 8 }} />
                Teléfono # de contacto
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Formulario animado */}
        <motion.div id="consulta-form" initial={{ opacity: 0, y: 50 }} animate={controls}>
          <Card
            title="Formulario de Consulta"
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              backgroundColor: "white",
            }}
          >
            <Form
              layout="vertical"
              onFinish={(values) => alert("Consulta enviada:\n" + JSON.stringify(values, null, 2))}
              requiredMark={false}
            >
              <Form.Item
                label="Nombre completo"
                name="fullname"
                rules={[{ required: true, message: "Por favor ingrese su nombre completo" }]}
              >
                <Input placeholder="Nombre completo" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Fecha de nacimiento"
                name="birthdate"
                rules={[{ required: true, message: "Por favor ingrese su fecha de nacimiento" }]}
              >
                <Input type="date" prefix={<CalendarOutlined />} />
              </Form.Item>

              <Form.Item
                label="Correo electrónico"
                name="email"
                rules={[
                  { type: "email", message: "Correo inválido" },
                  { required: true, message: "Por favor ingrese su correo electrónico" },
                ]}
              >
                <Input placeholder="correo@ejemplo.com" prefix={<MailOutlined />} />
              </Form.Item>

              <Form.Item
                label="RUT"
                name="rut"
                rules={[{ required: true, message: "Por favor ingrese su RUT" }]}
              >
                <Input placeholder="12.345.678-9" prefix={<IdcardOutlined />} />
              </Form.Item>

              <Form.Item
                label="Ciudad"
                name="city"
                rules={[{ required: true, message: "Por favor ingrese su ciudad" }]}
              >
                <Input placeholder="Ciudad" prefix={<EnvironmentOutlined />} />
              </Form.Item>

              <Form.Item
                label="Dirección de residencia"
                name="address"
                rules={[{ required: true, message: "Por favor ingrese su dirección" }]}
              >
                <Input placeholder="Dirección" prefix={<EnvironmentOutlined />} />
              </Form.Item>

              <Form.Item
                label="Teléfono de contacto"
                name="phone"
                rules={[{ required: true, message: "Por favor ingrese su teléfono" }]}
              >
                <Input placeholder="+56 9 1234 5678" prefix={<PhoneOutlined />} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Enviar Consulta
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      </Content>

      {/* Botón WhatsApp fijo */}
      <a
        href="https://wa.me/56912345678?text=Hola%20quiero%20hacer%20una%20consulta%20en%20Centro%20Médico%20San%20Martín"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#25D366",
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1500,
          cursor: "pointer",
        }}
        aria-label="Consulta por WhatsApp"
        title="Consulta por WhatsApp"
      >
        <WhatsAppOutlined style={{ fontSize: 30, color: "white" }} />
      </a>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#bae7ff",
          color: "#096dd9",
          userSelect: "none",
          fontWeight: "bold",
        }}
      >
        Centro Médico San Martín ©2025
      </Footer>
    </Layout>
  );
}
