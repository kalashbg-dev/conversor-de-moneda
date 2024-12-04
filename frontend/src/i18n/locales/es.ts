export const es = {
  common: {
    loading: "Cargando...",
    error: "Ha ocurrido un error",
    success: "Éxito",
    cancel: "Cancelar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    create: "Crear",
    search: "Buscar",
    noResults: "No se encontraron resultados",
    confirm: "Confirmar",
    actions: "Acciones"
  },
  menu: {
    label: "Menú",
    our_rates: "Nuestras Tasas",
    rate_history: "Historial de Tasas",
    conversion_history: "Historial de Conversiones",
    home: "Inicio"
  },
  admin_menu: {
    institutions: "Instituciones",
    users: "Usuarios",
    exchange_rates: "Tasas de Cambio",
    institution_rates: "Tasas Institucionales",
    management: "Administración"
  },
  auth: {
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    email: "Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    username: "Nombre de usuario",
    name: "Nombre",
    role: "Rol",
    loginSuccess: "Inicio de sesión exitoso",
    registerSuccess: "Registro exitoso",
    confirmEmail: "Por favor confirma tu correo",
    passwordMismatch: "Las contraseñas no coinciden",
    invalidCredentials: "Credenciales inválidas"
  },
  converter: {
    title: "Conversor de Moneda",
    headline: "Convierte monedas utilizando tasas de cambio en tiempo real. Inicia sesión para acceder a tasas institucionales.",
    institute_selector: {
      label: "Institución (Opcional)",
      default_option: "Selecciona una institución",
    },
    from_label: "Cantidad",
    to_label: "Convertido a",
    tooltip_title: "Tasa de cambio en ",
    tooltip_description: "Las tasas en vivo varían minuto a minuto. Las cotizaciones que recibas aquí pueden diferir del monto final de tu transacción.",
    reset_button: "Restablecer",
    conversionSuccess: "Conversión exitosa",
    conversionError: "Error durante la conversión"
  },
  available_rates: {
    title: "Tasas de cambio disponibles",
    currency_selector: {
      label: "Seleccionar moneda",
      search_label: "Buscar",
    },
    noRatesFound: "No se encontraron tasas de cambio",
    lastUpdated: "Última actualización"
  },
  exchange_rate_details: {
    title: "Detalles de la Tasa de Cambio",
    from: "Moneda de Origen",
    to: "Moneda de Destino",
    exchange_rate: "Tasa de Cambio",
    last_updated: "Última Actualización",
    notFound: "Tasa de cambio no encontrada",
    deleteConfirm: "¿Estás seguro de que deseas eliminar esta tasa de cambio?",
    columns: {
      type: "TIPO",
      from: "ORIGEN",
      to: "DESTINO",
      rate: "TASA",
      institution: "INSTITUCIÓN",
      date: "FECHA"
    },
    types: {
      general: "General",
      institutional: "Institucional"
    }
  },
  institutions: {
    create: "Crear Institución",
    edit: "Editar Institución",
    delete: "Eliminar Institución",
    deleteConfirm: "¿Estás seguro de que deseas eliminar esta institución?",
    name: "Nombre de la Institución",
    country: "País",
    noInstitutions: "No se encontraron instituciones"
  },
  users: {
    create: "Crear Usuario",
    edit: "Editar Usuario",
    delete: "Eliminar Usuario",
    deleteConfirm: "¿Estás seguro de que deseas eliminar este usuario?",
    status: {
      active: "Activo",
      inactive: "Inactivo",
      pending: "Pendiente de Confirmación"
    }
  }
};
