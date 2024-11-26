export const en = {
  common: {
    loading: "Loading...",
  },
  menu: {
    label: "Menu",
    our_rates: "Our Rates",
    rate_history: "Rate History",
    conversion_history: "Conversion History",
  },
  admin_menu: {
    institutions: "Institutions",
    users: "Users",
    exchange_rates: "Exchange Rates",
    institution_rates: "Institution Rates",
  },
  auth: {
    login: "Login",
    register: "Register",
    logout: "Logout",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    username: "Username",
    name: "Name",
    role: "Role",
  },
  converter: {
    title: "Currency Converter",
    headline:
      "Convert currencies using real-time exchange rates. Sign in to access institutional rates.",
    institute_selector: {
      label: "Institution (Optional)",
      default_option: "Select an institution",
    },
    from_label: "Amount",
    to_label: "Converted to",
    tooltip_title: "Exchange rate at ",
    tooltip_description:
      "Live rates vary minute to minute. The quotes you receive here will differ from your final trade amount.",
    reset_button: "Reset",
},
available_rates: {
  title: "Available exchange rates",
  currency_selector: {
    label: "Select currency",
    search_label: "Search",
  },
},
  exchange_rate_details: {
    title: "Exchange Rate Details",
    from: "From Currency",
    to: "To Currency",
    exchange_rate: "Exchange Rate",
    last_updated: "Last Updated",
  },
  exchange_rates: {
    table: {
      title: "Exchange rates table",
      columns: {
        id: "ID",
        from: "FROM",
        to: "TO",
        rate: "RATE",
        last_update: "LAST UPDATE",
        actions: "ACTIONS"
      },
      actions: {
        edit: "Edit rate",
        delete: "Delete rate"
      },
      empty: "No exchange rates found"
    },
    modal: {
      from_currency: "From Currency (e.g., EUR)",
      to_currency: "To Currency (e.g., EUR)",
      currency_code_help: "3-letter currency code",
      rate: "Exchange Rate",
      decimals_help: "Up to 4 decimal places",
      institution: "Institution",
      select_institution: "Select an institution",
      buttons: {
        cancel: "Cancel",
        create: "Create",
        update: "Update"
      }
    },
    grid: {
      no_results: "No exchange rates found",
      no_results_for: "No exchange rates found for \"{query}\""
    }
  }
};
