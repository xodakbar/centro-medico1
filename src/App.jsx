import React, { useEffect } from "react";
import {
  Layout,
  Menu,
  Card,
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Select,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  MailOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { motion, useAnimation } from "framer-motion";
import imagenPrincipal from "./assets/img/imagen Principal.jpg";
import logo from "./assets/img/logo.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function App() {
  const controls = useAnimation();
  const [form] = Form.useForm();

  useEffect(() => {
    const handleScroll = () => {
      const formEl = document.getElementById("consulta-form");
      if (!formEl) return;
      const rect = formEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        controls.start({ opacity: 1, y: 0, transition: { duration: 0.7 } });
      } else {
        controls.start({ opacity: 0, y: 50 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const enviarWhatsApp = (values) => {
    const {
      fullname,
      birthdate,
      email,
      rut,
      city,
      address,
      phone,
      consultaTipo,
    } = values;

    const tipos = {
      psicologia: "Psicología",
      "medicina-general": "Medicina general adultos e infantiles",
      nutricion: "Nutrición y control de peso",
      telemedicina: "Telemedicina",
    };

    const texto = `Hola Centro Médico San Martín, quiero hacer una consulta con los siguientes datos:\n\nNombre completo: ${fullname}\nFecha de nacimiento: ${birthdate}\nCorreo: ${email}\nRUT: ${rut}\nCiudad: ${city}\nDirección: ${address}\nTeléfono: ${phone}\nTipo de consulta: ${tipos[consultaTipo] || consultaTipo}`;

    const url = `https://wa.me/56954136764?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  const onFinish = (values) => {
    enviarWhatsApp(values);
  };

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
        <img
          src={logo}
          alt="Centro Médico San Martín"
          style={{ height: 40, marginRight: 24, cursor: "pointer" }}
          onClick={() => scrollToSection("inicio")}
        />
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["inicio"]}
          style={{ flex: 1, backgroundColor: "transparent", justifyContent: "flex-end" }}
          items={[
            { key: "inicio", label: <a onClick={() => scrollToSection("inicio")}>Inicio</a> },
            { key: "servicios", label: <a onClick={() => scrollToSection("servicios")}>Servicios</a> },
            { key: "contacto", label: <a onClick={() => scrollToSection("consulta-form")}>Contacto</a> },
          ]}
        />
      </Header>

      <Content
        id="inicio"
        style={{ padding: "100px 24px 48px", maxWidth: 720, margin: "auto", display: "flex", flexDirection: "column", gap: 32 }}
      >
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
          <motion.img
            src={imagenPrincipal}
            alt="Centro médico"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
            style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
          />
        </div>

        <motion.div
          id="servicios"
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
              padding: "24px",
            }}
          >
            <Title level={3} style={{ color: "#096dd9" }}>
              Bienvenid@ a Centro Médico San Martín
            </Title>

            <Paragraph style={{ fontSize: 16 }}>
              Somos un centro médico comprometido con tu bienestar. Nuestro equipo ofrece atención cercana, profesional y accesible en las siguientes áreas:
            </Paragraph>

            <Row gutter={[16, 16]}>
              <Col span={24} sm={12}>
                <Card size="small" bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                  <Title level={5} style={{ color: "#096dd9" }}>🧠 Psicología</Title>
                  <Paragraph style={{ marginBottom: 0 }}>
                    Atención emocional y apoyo terapéutico para adultos y adolescentes.
                  </Paragraph>
                </Card>
              </Col>
              <Col span={24} sm={12}>
                <Card size="small" bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                  <Title level={5} style={{ color: "#096dd9" }}>🩺 Medicina general</Title>
                  <Paragraph style={{ marginBottom: 0 }}>
                    Chequeos médicos para adultos e infantiles, con receta incluida.
                  </Paragraph>
                </Card>
              </Col>
              <Col span={24} sm={12}>
                <Card size="small" bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                  <Title level={5} style={{ color: "#096dd9" }}>🥗 Nutrición y control de peso</Title>
                  <Paragraph style={{ marginBottom: 0 }}>
                    Planes alimenticios personalizados y seguimiento profesional.
                  </Paragraph>
                </Card>
              </Col>
              <Col span={24} sm={12}>
                <Card size="small" bordered={false} style={{ backgroundColor: "#e6f7ff" }}>
                  <Title level={5} style={{ color: "#096dd9" }}>💻 Telemedicina</Title>
                  <Paragraph style={{ marginBottom: 0 }}>
                    Consulta médica desde la comodidad de tu hogar.
                  </Paragraph>
                </Card>
              </Col>
            </Row>

            <Paragraph style={{ marginTop: 24, fontSize: 16 }}>
              <ClockCircleOutlined style={{ color: "#096dd9", marginRight: 8 }} />
              <b>Horario de atención:</b> lunes a sábado de 8:00 am a 8:00 pm
            </Paragraph>

            <Paragraph style={{ fontSize: 16, marginTop: 16 }}>
              <b>Valor consulta:</b> $25.000 (incluye receta y chequeo médico)
            </Paragraph>
          </Card>
        </motion.div>

        <motion.div id="consulta-form" initial={{ opacity: 0, y: 50 }} animate={controls}>
          <Card
            title="Formulario de Consulta"
            bordered={false}
            style={{ borderRadius: 10, boxShadow: "0 4px 15px rgba(0,0,0,0.08)", backgroundColor: "white" }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={false}
              scrollToFirstError
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="fullname"
                    label="Nombre completo"
                    rules={[
                      { required: true, message: "Por favor ingrese su nombre completo" },
                      { min: 5, message: "Nombre demasiado corto" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Ej: Juan Pérez Gómez" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="birthdate"
                    label="Fecha de nacimiento"
                    rules={[
                      { required: true, message: "Por favor ingrese su fecha de nacimiento" },
                    ]}
                  >
                    <Input type="date" prefix={<CalendarOutlined />} />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Correo electrónico"
                    rules={[
                      { type: "email", message: "Correo inválido" },
                      { required: true, message: "Por favor ingrese su correo electrónico" },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="ejemplo@correo.com" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="rut"
                    label="RUT"
                    rules={[
                      { required: true, message: "Por favor ingrese su RUT" },
                      {
                        pattern: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/,
                        message: "Formato de RUT inválido",
                      },
                    ]}
                  >
                    <Input prefix={<IdcardOutlined />} placeholder="12.345.678-9" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="city"
                    label="Ciudad"
                    rules={[{ required: true, message: "Por favor ingrese su ciudad" }]}
                  >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Ej: Ñuñoa" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="address"
                    label="Dirección de residencia"
                    rules={[{ required: true, message: "Por favor ingrese su dirección" }]}
                  >
                    <Input prefix={<EnvironmentOutlined />} placeholder="Ej: Irarrázaval 2821, Cons 1108" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="phone"
                    label="Teléfono de contacto"
                    rules={[
                      { required: true, message: "Por favor ingrese su teléfono" },
                      {
                        pattern: /^\+?[\d\s]+$/,
                        message: "Número de teléfono inválido",
                      },
                    ]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="+56 9 1234 5678" />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item
                    name="consultaTipo"
                    label="Tipo de consulta"
                    rules={[{ required: true, message: "Seleccione un tipo de consulta" }]}
                    tooltip="Elija el tipo de consulta que desea realizar"
                  >
                    <Select placeholder="Seleccione un tipo">
                      <Option value="psicologia">Psicología</Option>
                      <Option value="medicina-general">Medicina general adultos e infantiles</Option>
                      <Option value="nutricion">Nutrición y control de peso</Option>
                      <Option value="telemedicina">Telemedicina</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="default"
                  onClick={() => form.resetFields()}
                  style={{ width: "48%" }}
                >
                  Limpiar
                </Button>
                <Button type="primary" htmlType="submit" style={{ width: "48%" }}>
                  Enviar Consulta
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>

        <div
          style={{
            width: "100%",
            height: 360,
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <Title level={4} style={{ marginBottom: 8 }}>
            Estamos ubicados en:
          </Title>
          <iframe
            title="Mapa"
            src="https://www.google.com/maps?q=Irarrázaval+2821+Oficina+1108,+Ñuñoa,+Chile&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </Content>

      <a
        href="https://wa.me/56954136764"
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
        }}
        aria-label="Consulta por WhatsApp"
      >
        <WhatsAppOutlined style={{ fontSize: 30, color: "white" }} />
      </a>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#bae7ff",
          color: "#096dd9",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        Centro Médico San Martín ©2025 |{" "}
        <a
          href="https://wa.me/56954136764"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#096dd9", marginRight: 12 }}
          aria-label="WhatsApp"
        >
          <WhatsAppOutlined /> +56 9 5413 6764
        </a>{" "}
        |{" "}
        <a
          href="https://instagram.com/cmsmartin_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#096dd9" }}
          aria-label="Instagram"
        >
          <InstagramOutlined /> cmsmartin_
        </a>
      </Footer>
    </Layout>
  );
}
