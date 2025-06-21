import React, { useState } from "react";
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
  message,
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
  ReloadOutlined,
  SendOutlined,
  EnvironmentFilled,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import imagenPrincipal from "./assets/img/imagen_principal.jpg";
import logo from "./assets/img/logo.png";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

export default function App() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Animaciones con observer para cada sección principal
  const { ref: serviciosRef, inView: serviciosInView } = useInView({ triggerOnce: true, threshold: 0.13 });
  const { ref: formRef, inView: formInView } = useInView({ triggerOnce: true, threshold: 0.13 });
  const { ref: mapRef, inView: mapInView } = useInView({ triggerOnce: true, threshold: 0.13 });

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80; // Ajusta esto según el alto de tu header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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
    setLoading(true);
    setTimeout(() => {
      enviarWhatsApp(values);
      setLoading(false);
      form.resetFields();
      window.scrollTo({ top: 0, behavior: "smooth" });
      message.success("¡Consulta enviada por WhatsApp!");
    }, 600);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "linear-gradient(135deg,#e6f7ff,#fff)" }}>
      {/* HEADER */}
      <Header
        style={{
          position: "fixed",
          width: "100%",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          background: "rgba(186,231,255,0.95)",
          boxShadow: "0 2px 12px 0 rgba(0,0,0,0.09)",
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
          style={{ flex: 1, background: "transparent", justifyContent: "flex-end", fontWeight: 600 }}
          items={[
            { key: "inicio", label: <a onClick={() => scrollToSection("inicio")}>Inicio</a> },
            { key: "servicios", label: <a onClick={() => scrollToSection("servicios")}>Servicios</a> },
            { key: "contacto", label: <a onClick={() => scrollToSection("consulta-form")}>Contacto</a> },
            {
              key: "ubicacion",
              label: (
                <a onClick={() => scrollToSection("mapa")}>
                  <EnvironmentFilled /> Ubicación
                </a>
              ),
            },
          ]}
        />
      </Header>

      {/* CONTENT */}
      <Content
        id="inicio"
        style={{
          padding: "110px 12px 40px",
          maxWidth: 760,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 28, // compacto
        }}
      >
        {/* Imagen principal */}
        <div style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)", marginBottom: 24 }}>
          <motion.img
            src={imagenPrincipal}
            alt="Centro médico"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            whileHover={{ scale: 1.025 }}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              display: "block",
              borderRadius: "16px",
              boxShadow: "0 4px 28px 0 rgba(90,170,220,0.12)",
            }}
          />
        </div>

        {/* Servicios */}
        <motion.div
          ref={serviciosRef}
          id="servicios"
          style={{ minHeight: 340, marginBottom: 18 }}
          initial={{ opacity: 0, y: 50 }}
          animate={serviciosInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.15, ease: "easeOut" }}
        >
          <Card
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 6px 22px 0 rgba(70,140,210,0.10)",
              background: "rgba(255,255,255,0.95)",
              padding: "28px 22px",
              transition: "box-shadow 0.2s",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Title level={3} style={{ color: "#096dd9" }}>
              Bienvenid@ a Centro Médico San Martín
            </Title>

            <Paragraph style={{ fontSize: 17, marginBottom: 18 }}>
              Somos un centro médico comprometido con tu bienestar. Nuestro equipo ofrece atención cercana, profesional y accesible en las siguientes áreas:
            </Paragraph>

            <Row gutter={[20, 20]}>
              {[
                {
                  icon: "🧠",
                  title: "Psicología",
                  desc: "Atención emocional y apoyo terapéutico para adultos y adolescentes.",
                },
                {
                  icon: "🩺",
                  title: "Medicina general",
                  desc: "Chequeos médicos para adultos e infantiles, con receta incluida.",
                },
                {
                  icon: "🥗",
                  title: "Nutrición y control de peso",
                  desc: "Planes alimenticios personalizados y seguimiento profesional.",
                },
                {
                  icon: "💻",
                  title: "Telemedicina",
                  desc: "Consulta médica desde la comodidad de tu hogar.",
                },
              ].map((item, i) => (
                <Col xs={24} sm={12} key={i}>
                  <motion.div whileHover={{ scale: 1.03, boxShadow: "0 4px 32px 0 rgba(9,109,217,0.10)" }}>
                    <Card
                      size="small"
                      bordered={false}
                      style={{
                        background: "linear-gradient(100deg,#e6f7ff 65%,#bae7ff 120%)",
                        borderRadius: 12,
                        marginBottom: 0,
                        minHeight: 94,
                        transition: "box-shadow 0.2s",
                      }}
                      bodyStyle={{ padding: 18 }}
                    >
                      <Title level={5} style={{ color: "#096dd9", marginBottom: 5 }}>
                        {item.icon} {item.title}
                      </Title>
                      <Paragraph style={{ marginBottom: 0 }}>{item.desc}</Paragraph>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <Paragraph style={{ marginTop: 18, fontSize: 16 }}>
              <ClockCircleOutlined style={{ color: "#096dd9", marginRight: 8 }} />
              <b>Horario de atención:</b> lunes a sábado de 8:00 am a 8:00 pm
            </Paragraph>
            <Paragraph style={{ fontSize: 16, marginTop: 8 }}>
              <b>Valor consulta:</b> $25.000 (incluye receta y chequeo médico)
            </Paragraph>
          </Card>
        </motion.div>

        {/* Formulario */}
        <motion.div
          ref={formRef}
          id="consulta-form"
          style={{ minHeight: 320, marginBottom: 18 }}
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.15, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.01, boxShadow: "0 8px 30px 0 rgba(9,109,217,0.07)" }}>
            <Card
              title={
                <span>
                  <WhatsAppOutlined style={{ color: "#25D366", fontSize: 26, marginRight: 6 }} />
                  <span style={{ color: "#096dd9" }}>Formulario de Consulta</span>
                </span>
              }
              bordered={false}
              style={{
                borderRadius: 18,
                boxShadow: "0 6px 28px 0 rgba(9,109,217,0.12)",
                background: "rgba(255,255,255,0.98)",
                marginTop: 2,
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false}
                scrollToFirstError
              >
                <Row gutter={18}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="fullname"
                      label="Nombre completo"
                      rules={[
                        { required: true, message: "Por favor ingrese su nombre completo" },
                        { min: 5, message: "Nombre demasiado corto" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined />}
                        placeholder="Ej: Juan Pérez Gómez"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="birthdate"
                      label="Fecha de nacimiento"
                      rules={[{ required: true, message: "Por favor ingrese su fecha de nacimiento" }]}
                    >
                      <Input
                        prefix={<CalendarOutlined />}
                        type="date"
                        size="large"
                        style={{ borderRadius: 8, paddingTop: 3, paddingBottom: 3 }}
                      />
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
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="ejemplo@correo.com"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
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
                      <Input
                        prefix={<IdcardOutlined />}
                        placeholder="12.345.678-9"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="city"
                      label="Ciudad"
                      rules={[{ required: true, message: "Por favor ingrese su ciudad" }]}
                    >
                      <Input
                        prefix={<EnvironmentOutlined />}
                        placeholder="Ej: Ñuñoa"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="address"
                      label="Dirección de residencia"
                      rules={[{ required: true, message: "Por favor ingrese su dirección" }]}
                    >
                      <Input
                        prefix={<EnvironmentOutlined />}
                        placeholder="Ej: Irarrázaval 2821, Cons 1108"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
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
                      <Input
                        prefix={<PhoneOutlined />}
                        placeholder="+56 9 1234 5678"
                        size="large"
                        style={{ borderRadius: 8 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="consultaTipo"
                      label="Tipo de consulta"
                      rules={[{ required: true, message: "Seleccione un tipo de consulta" }]}
                      tooltip="Elija el tipo de consulta que desea realizar"
                    >
                      <Select
                        placeholder="Seleccione un tipo"
                        size="large"
                        style={{ borderRadius: 8 }}
                        dropdownStyle={{ borderRadius: 10 }}
                      >
                        <Option value="psicologia">Psicología</Option>
                        <Option value="medicina-general">Medicina general adultos e infantiles</Option>
                        <Option value="nutricion">Nutrición y control de peso</Option>
                        <Option value="telemedicina">Telemedicina</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item style={{ marginTop: 18, marginBottom: 4 }}>
                  <Row gutter={16} justify="space-between">
                    <Col xs={12}>
                      <Button
                        type="ghost"
                        icon={<ReloadOutlined />}
                        onClick={() => form.resetFields()}
                        block
                        style={{
                          borderRadius: 8,
                          fontWeight: 500,
                          border: "1px solid #b2c6d5",
                          background: "#f0f5ff",
                          transition: "all 0.2s",
                        }}
                      >
                        Limpiar
                      </Button>
                    </Col>
                    <Col xs={12}>
                      <Button
                        type="primary"
                        icon={<SendOutlined />}
                        htmlType="submit"
                        loading={loading}
                        block
                        style={{
                          borderRadius: 8,
                          fontWeight: 600,
                          background: "linear-gradient(90deg,#25D366 40%,#08A045 100%)",
                          border: "none",
                          color: "#fff",
                          transition: "box-shadow 0.2s",
                          boxShadow: "0 4px 16px 0 rgba(37,211,102,0.11)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Enviar Consulta por WhatsApp
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </motion.div>

        {/* Mapa */}
        <motion.div
          ref={mapRef}
          id="mapa"
          style={{
            width: "100%",
            height: 300,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 6px 30px 0 rgba(70,140,210,0.08)",
            background: "#e6f7ff",
            marginBottom: 0,
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={mapInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.15, ease: "easeOut" }}
        >
          <Title level={4} style={{ margin: 18 }}>
            Estamos ubicados en:
          </Title>
          <iframe
            title="Mapa"
            src="https://www.google.com/maps?q=Irarrázaval+2821+Oficina+1108,+Ñuñoa,+Chile&output=embed"
            width="100%"
            height="88%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </motion.div>
      </Content>

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href="https://wa.me/56954136764"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          background: "linear-gradient(135deg,#25D366 60%,#08A045 110%)",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 6px 24px rgba(37,211,102,0.22)",
          zIndex: 2000,
          animation: "pulse 1.7s infinite",
        }}
        aria-label="Consulta por WhatsApp"
      >
        <WhatsAppOutlined style={{ fontSize: 33, color: "#fff" }} />
      </a>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(37,211,102,0.17); }
          70% { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
          100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.13); }
        }
      `}</style>

      {/* FOOTER */}
      <Footer
        style={{
          textAlign: "center",
          background: "#bae7ff",
          color: "#096dd9",
          fontWeight: "bold",
          fontSize: 15,
          borderTop: "1px solid #e6f7ff",
          userSelect: "none",
          letterSpacing: 0.5,
          paddingBottom: 14,
        }}
      >
        Centro Médico San Martín ©2025 |
        <a
          href="https://wa.me/56954136764"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#096dd9", marginLeft: 8, marginRight: 8 }}
          aria-label="WhatsApp"
        >
          <WhatsAppOutlined /> +56 9 5413 6764
        </a>
        |
        <a
          href="https://instagram.com/cmsmartin_"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#096dd9", marginLeft: 8 }}
          aria-label="Instagram"
        >
          <InstagramOutlined /> cmsmartin_
        </a>
      </Footer>
    </Layout>
  );
}
