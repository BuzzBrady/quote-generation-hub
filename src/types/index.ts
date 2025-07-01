// User types
export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'global_app_admin' | 'trade_company_user';
  company_id?: string;
  created_at: Date;
  updated_at: Date;
}

// Trade types
export interface Trade {
  trade_id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface QuoteField {
  field_id: string;
  name: string;
  dataType: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multiselect';
  category: string;
  description?: string;
  displayIfEmptyMessage?: string;
  is_globally_mandatory: boolean;
  options?: string[]; // For select/multiselect fields
  created_at: Date;
  updated_at: Date;
}

export interface TradeTemplate {
  template_id: string;
  name: string;
  type: 'standard_form' | 'conversational_flow';
  structure: any; // JSON structure for template
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Company types
export interface Company {
  company_id: string;
  name: string;
  assigned_trades: string[];
  status: 'active' | 'inactive';
  created_by: string;
  created_at: Date;
  updated_at: Date;
}

export interface BusinessSettings {
  business_name: string;
  abn: string;
  logo_url?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  terms_and_conditions: string;
  updated_at: Date;
}

export interface SystemSettings {
  quote_number_prefix: string;
  next_quote_number: number;
  date_format: string;
  currency_symbol: string;
  tax_rate: number;
  tax_name: string; // e.g., "GST", "VAT"
  updated_at: Date;
}

// Client types
export interface Client {
  client_id: string;
  name: string;
  email?: string;
  phone?: string;
  address: string;
  contact_person?: string;
  crm_id?: string; // For GoHighLevel integration
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

// Product types
export interface ProductService {
  product_id: string;
  sku: string;
  name: string;
  description?: string;
  type: 'material' | 'labour' | 'service' | 'equipment';
  category: string;
  base_cost: number;
  unit_of_measure: string;
  default_margin_percentage: number;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Margin and pricing types
export interface MarginRule {
  category: string;
  margin_percentage: number;
}

export interface MarginRules {
  rules: MarginRule[];
  updated_at: Date;
}

export interface Rebate {
  rebate_id: string;
  name: string;
  type: 'fixed_amount' | 'percentage';
  amount?: number;
  percentage?: number;
  applies_to_category?: string;
  applies_to_sku?: string;
  conditions?: string;
  external_rule_source?: string; // URL for external source like Google Sheets
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// Quote types
export interface LineItemRaw {
  product_id: string;
  sku: string;
  name: string;
  quantity: number;
  notes?: string;
}

export interface LineItemProcessed {
  product_id: string;
  sku: string;
  name: string;
  description?: string;
  quantity: number;
  unit_of_measure: string;
  base_cost: number;
  margin_percentage: number;
  is_margin_overridden: boolean;
  unit_selling_price: number;
  line_total: number;
  category: string;
  type: string;
  notes?: string;
}

export interface CalculatedSummary {
  subtotal_before_discounts: number;
  discount_amount: number;
  subtotal_after_discounts: number;
  rebates_applied: {
    rebate_id: string;
    name: string;
    amount: number;
  }[];
  total_rebates: number;
  subtotal_after_rebates: number;
  tax_amount: number;
  final_total_amount: number;
  margin_summary: {
    total_cost: number;
    total_margin: number;
    overall_margin_percentage: number;
  };
}

export interface ExportEvent {
  export_id: string;
  exported_at: Date;
  external_system: string;
  status: 'success' | 'failed' | 'pending';
  response_data?: any;
  error_message?: string;
}

export interface Quote {
  quote_id: string;
  quote_number: string;
  customer_id: string;
  customer_name: string;
  status: 'draft' | 'calculated' | 'exported' | 'accepted' | 'rejected';
  trade_id: string;
  template_id: string;
  raw_data_fields: Record<string, any>;
  line_items_raw: LineItemRaw[];
  line_items_processed?: LineItemProcessed[];
  calculated_summary?: CalculatedSummary;
  export_history: ExportEvent[];
  created_at: Date;
  updated_at: Date;
  expires_at?: Date;
}

// Form types for UI
export interface QuoteFormData {
  client_id: string;
  template_id: string;
  trade_id: string;
  raw_data_fields: Record<string, any>;
  line_items_raw: LineItemRaw[];
}

// Conversational flow types
export interface FlowNode {
  node_id: string;
  type: 'question' | 'action' | 'end';
  question?: string;
  field_id?: string; // Links to QuoteField
  answers?: FlowAnswer[];
  actions?: FlowAction[];
}

export interface FlowAnswer {
  answer_id: string;
  text: string;
  value: any;
  next_node_id?: string;
  actions?: FlowAction[];
}

export interface FlowAction {
  action_type: 'populate_field' | 'add_line_item' | 'go_to_node' | 'end_flow';
  field_id?: string;
  value?: any;
  product_id?: string;
  quantity?: number;
  next_node_id?: string;
}

export interface ConversationalFlow {
  flow_id: string;
  name: string;
  trade_id: string;
  start_node_id: string;
  nodes: FlowNode[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation and UI types
export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: MenuItem[];
}

export interface DashboardMetrics {
  total_quotes: number;
  quotes_this_month: number;
  total_revenue: number;
  revenue_this_month: number;
  conversion_rate: number;
  avg_quote_value: number;
}
