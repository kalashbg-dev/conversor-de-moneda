export const es = {
  common: {
    loading: "Cargando...",
  },
  menu: {
    label: "Menú",
    our_rates: "Nuestras Tasas",
    rate_history: "Historial de Tasas",
    conversion_history: "Historial de Conversiones",
  },
  admin_menu: {
    institutions: "Instituciones",
    users: "Usuarios",
    exchange_rates: "Tasas de Cambio",
    institution_rates: "Tasas Institucionales",
  },
  auth: {
    login: "Iniciar sesión",
    register: "Registrarse",
    logout: "Cerrar sesión",
    email: "Correo",
    password: "Contraseña",
    confirmPassword: "Confirmar contraseña",
    username: "Nombre de usuario",
    name: "Nombre",
    role: "Rol",
  },
  converter: {
    title: "Conversor de Moneda",
    headline:
      "Convierte monedas utilizando tasas de cambio en tiempo real. Inicia sesión para acceder a tasas institucionales.",
    institute_selector: {
      label: "Institución (Opcional)",
      default_option: "Selecciona una institución",
    },
    from_label: "Cantidad",
    to_label: "Convertido a",
    tooltip_title: "Tasa de cambio en ",
    tooltip_description:
      "Las tasas en vivo varían minuto a minuto. Las cotizaciones que recibas aquí pueden diferir del monto final de tu transacción.",
    reset_button: "Restablecer",
  },
  available_rates: {
    title: "Tasas de cambio disponibles",
    currency_selector: {
      label: "Seleccionar moneda",
      search_label: "Buscar",
    },
  },
  exchange_rate_details: {
    title: "Detalles de la Tasa de Cambio",
    from: "Moneda de Origen",
    to: "Moneda de Destino",
    exchange_rate: "Tasa de Cambio",
    last_updated: "Última Actualización",
  },
  exchange_rates: {
    table: {
      title: "Tabla de tasas de cambio",
      columns: {
        id: "ID",
        from: "DESDE",
        to: "HASTA",
        rate: "TASA",
        last_update: "ÚLTIMA ACTUALIZACIÓN",
        actions: "ACCIONES"
      },
      actions: {
        edit: "Editar tasa",
        delete: "Eliminar tasa"
      },
      empty: "No se encontraron tasas de cambio"
    },
    modal: {
      from_currency: "Moneda origen (ej., EUR)",
      to_currency: "Moneda destino (ej., EUR)",
      currency_code_help: "Código de 3 letras",
      rate: "Tasa de cambio",
      decimals_help: "Hasta 4 decimales",
      institution: "Institución",
      select_institution: "Seleccione una institución",
      buttons: {
        cancel: "Cancelar",
        create: "Crear",
        update: "Actualizar"
      }
    },
    grid: {
      no_results: "No se encontraron tasas de cambio",
      no_results_for: "No se encontraron tasas de cambio para \"{query}\""
    }
  }
};
