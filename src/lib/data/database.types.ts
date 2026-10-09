
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "graphql_public": {
          Tables: {
            [_ in never]: never
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "graphql":
{ Args: { "extensions"?: Json,"operationName"?: string,"query"?: string,"variables"?: Json }; Returns: Json
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        },"public": {
          Tables: {
            "class_groups": {
                  Row: {
                    "color_dot": string,"color_ink": string,"color_soft": string,"created_at": string,"id": string,"label": string,"slug": string,"sort_order": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "color_dot": string,"color_ink": string,"color_soft": string,"created_at"?: string,"id"?: string,"label": string,"slug": string,"sort_order"?: number,"updated_at"?: string
                  }
                  Update: {
                    "color_dot"?: string,"color_ink"?: string,"color_soft"?: string,"created_at"?: string,"id"?: string,"label"?: string,"slug"?: string,"sort_order"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"class_types": {
                  Row: {
                    "created_at": string,"description": string,"group_id": string,"highlights": (string)[],"id": string,"is_published": boolean,"name": string,"slug": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"description": string,"group_id": string,"highlights"?: (string)[],"id"?: string,"is_published"?: boolean,"name": string,"slug": string,"updated_at"?: string
                  }
                  Update: {
                    "created_at"?: string,"description"?: string,"group_id"?: string,"highlights"?: (string)[],"id"?: string,"is_published"?: boolean,"name"?: string,"slug"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "class_types_group_id_fkey"
      columns: ["group_id"]
isOneToOne: false
      referencedRelation: "class_groups"
      referencedColumns: ["id"]
    }
                  ]
                },"faqs": {
                  Row: {
                    "answer": string,"created_at": string,"id": string,"is_published": boolean,"question": string,"sort_order": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "answer": string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"question": string,"sort_order"?: number,"updated_at"?: string
                  }
                  Update: {
                    "answer"?: string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"question"?: string,"sort_order"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"free_class_requests": {
                  Row: {
                    "age": number,"audience": string,"created_at": string,"full_name": string,"id": string,"location_id": string,"status": string,"whatsapp": string
                  }
                  ComputedFields: never
                  Insert: {
                    "age": number,"audience": string,"created_at"?: string,"full_name": string,"id"?: string,"location_id": string,"status"?: string,"whatsapp": string
                  }
                  Update: {
                    "age"?: number,"audience"?: string,"created_at"?: string,"full_name"?: string,"id"?: string,"location_id"?: string,"status"?: string,"whatsapp"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "free_class_requests_location_id_fkey"
      columns: ["location_id"]
isOneToOne: false
      referencedRelation: "locations"
      referencedColumns: ["id"]
    }
                  ]
                },"hero": {
                  Row: {
                    "badge_text": string,"created_at": string,"eyebrow": string,"id": string,"image_alt": string,"image_path": string,"primary_cta_label": string,"secondary_cta_label": string,"singleton": boolean,"subtitle": string,"title": string,"title_highlight": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "badge_text": string,"created_at"?: string,"eyebrow": string,"id"?: string,"image_alt": string,"image_path": string,"primary_cta_label": string,"secondary_cta_label": string,"singleton"?: boolean,"subtitle": string,"title": string,"title_highlight": string,"updated_at"?: string
                  }
                  Update: {
                    "badge_text"?: string,"created_at"?: string,"eyebrow"?: string,"id"?: string,"image_alt"?: string,"image_path"?: string,"primary_cta_label"?: string,"secondary_cta_label"?: string,"singleton"?: boolean,"subtitle"?: string,"title"?: string,"title_highlight"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"instructors": {
                  Row: {
                    "bio": string,"created_at": string,"id": string,"is_published": boolean,"name": string,"photo_alt": string,"photo_path": string,"rank": string,"role": string | null,"sort_order": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "bio": string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"name": string,"photo_alt": string,"photo_path": string,"rank": string,"role"?: string | null,"sort_order"?: number,"updated_at"?: string
                  }
                  Update: {
                    "bio"?: string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"name"?: string,"photo_alt"?: string,"photo_path"?: string,"rank"?: string,"role"?: string | null,"sort_order"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"location_images": {
                  Row: {
                    "alt": string,"created_at": string,"id": string,"is_published": boolean,"location_id": string,"path": string,"sort_order": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "alt": string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"location_id": string,"path": string,"sort_order"?: number,"updated_at"?: string
                  }
                  Update: {
                    "alt"?: string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"location_id"?: string,"path"?: string,"sort_order"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "location_images_location_id_fkey"
      columns: ["location_id"]
isOneToOne: false
      referencedRelation: "locations"
      referencedColumns: ["id"]
    }
                  ]
                },"locations": {
                  Row: {
                    "address": string,"created_at": string,"id": string,"is_published": boolean,"main_image_alt": string,"main_image_path": string,"map_embed_url": string | null,"maps_url": string,"name": string,"neighborhood_label": string,"phone": string | null,"reference": string | null,"short_name": string,"slug": string,"sort_order": number,"updated_at": string,"whatsapp_message": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "address": string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"main_image_alt": string,"main_image_path": string,"map_embed_url"?: string | null,"maps_url": string,"name": string,"neighborhood_label": string,"phone"?: string | null,"reference"?: string | null,"short_name": string,"slug": string,"sort_order"?: number,"updated_at"?: string,"whatsapp_message"?: string | null
                  }
                  Update: {
                    "address"?: string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"main_image_alt"?: string,"main_image_path"?: string,"map_embed_url"?: string | null,"maps_url"?: string,"name"?: string,"neighborhood_label"?: string,"phone"?: string | null,"reference"?: string | null,"short_name"?: string,"slug"?: string,"sort_order"?: number,"updated_at"?: string,"whatsapp_message"?: string | null
                  }
                  Relationships: [
                    
                  ]
                },"programs": {
                  Row: {
                    "audience_label": string,"color": string | null,"created_at": string,"description": string,"group_id": string | null,"id": string,"image_alt": string | null,"image_path": string | null,"is_published": boolean,"name": string,"sort_order": number,"time_label": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "audience_label": string,"color"?: string | null,"created_at"?: string,"description": string,"group_id"?: string | null,"id"?: string,"image_alt"?: string | null,"image_path"?: string | null,"is_published"?: boolean,"name": string,"sort_order"?: number,"time_label": string,"updated_at"?: string
                  }
                  Update: {
                    "audience_label"?: string,"color"?: string | null,"created_at"?: string,"description"?: string,"group_id"?: string | null,"id"?: string,"image_alt"?: string | null,"image_path"?: string | null,"is_published"?: boolean,"name"?: string,"sort_order"?: number,"time_label"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "programs_group_id_fkey"
      columns: ["group_id"]
isOneToOne: false
      referencedRelation: "class_groups"
      referencedColumns: ["id"]
    }
                  ]
                },"schedule_slots": {
                  Row: {
                    "class_type_id": string,"created_at": string,"end_time": string,"id": string,"location_id": string,"start_time": string,"updated_at": string,"weekday": number
                  }
                  ComputedFields: never
                  Insert: {
                    "class_type_id": string,"created_at"?: string,"end_time": string,"id"?: string,"location_id": string,"start_time": string,"updated_at"?: string,"weekday": number
                  }
                  Update: {
                    "class_type_id"?: string,"created_at"?: string,"end_time"?: string,"id"?: string,"location_id"?: string,"start_time"?: string,"updated_at"?: string,"weekday"?: number
                  }
                  Relationships: [
                    {
      foreignKeyName: "schedule_slots_class_type_id_fkey"
      columns: ["class_type_id"]
isOneToOne: false
      referencedRelation: "class_types"
      referencedColumns: ["id"]
    },{
      foreignKeyName: "schedule_slots_location_id_fkey"
      columns: ["location_id"]
isOneToOne: false
      referencedRelation: "locations"
      referencedColumns: ["id"]
    }
                  ]
                },"section_content": {
                  Row: {
                    "body": string | null,"created_at": string,"eyebrow": string | null,"id": string,"key": string,"subtitle": string | null,"title": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "body"?: string | null,"created_at"?: string,"eyebrow"?: string | null,"id"?: string,"key": string,"subtitle"?: string | null,"title": string,"updated_at"?: string
                  }
                  Update: {
                    "body"?: string | null,"created_at"?: string,"eyebrow"?: string | null,"id"?: string,"key"?: string,"subtitle"?: string | null,"title"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"site_settings": {
                  Row: {
                    "business_name": string,"business_subtitle": string,"city": string,"copyright_text": string,"created_at": string,"email": string | null,"favicon_path": string,"footer_description": string,"free_class_max_age": number,"free_class_message": string,"free_class_min_age": number,"id": string,"logo_alt": string,"logo_path": string,"og_image_path": string,"phone": string | null,"seo_description": string,"seo_title": string,"singleton": boolean,"timezone": string,"updated_at": string,"whatsapp_number": string
                  }
                  ComputedFields: never
                  Insert: {
                    "business_name": string,"business_subtitle": string,"city": string,"copyright_text": string,"created_at"?: string,"email"?: string | null,"favicon_path": string,"footer_description": string,"free_class_max_age"?: number,"free_class_message": string,"free_class_min_age"?: number,"id"?: string,"logo_alt": string,"logo_path": string,"og_image_path": string,"phone"?: string | null,"seo_description": string,"seo_title": string,"singleton"?: boolean,"timezone"?: string,"updated_at"?: string,"whatsapp_number": string
                  }
                  Update: {
                    "business_name"?: string,"business_subtitle"?: string,"city"?: string,"copyright_text"?: string,"created_at"?: string,"email"?: string | null,"favicon_path"?: string,"footer_description"?: string,"free_class_max_age"?: number,"free_class_message"?: string,"free_class_min_age"?: number,"id"?: string,"logo_alt"?: string,"logo_path"?: string,"og_image_path"?: string,"phone"?: string | null,"seo_description"?: string,"seo_title"?: string,"singleton"?: boolean,"timezone"?: string,"updated_at"?: string,"whatsapp_number"?: string
                  }
                  Relationships: [
                    
                  ]
                },"social_links": {
                  Row: {
                    "created_at": string,"id": string,"platform": string,"sort_order": number,"updated_at": string,"url": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"id"?: string,"platform": string,"sort_order"?: number,"updated_at"?: string,"url": string
                  }
                  Update: {
                    "created_at"?: string,"id"?: string,"platform"?: string,"sort_order"?: number,"updated_at"?: string,"url"?: string
                  }
                  Relationships: [
                    
                  ]
                },"stats": {
                  Row: {
                    "created_at": string,"description": string,"id": string,"is_published": boolean,"label": string,"sort_order": number,"updated_at": string,"value": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"description": string,"id"?: string,"is_published"?: boolean,"label": string,"sort_order"?: number,"updated_at"?: string,"value": string
                  }
                  Update: {
                    "created_at"?: string,"description"?: string,"id"?: string,"is_published"?: boolean,"label"?: string,"sort_order"?: number,"updated_at"?: string,"value"?: string
                  }
                  Relationships: [
                    
                  ]
                },"testimonials": {
                  Row: {
                    "author_meta": string,"author_name": string,"created_at": string,"id": string,"is_published": boolean,"quote": string,"rating": number,"sort_order": number,"source": string,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "author_meta": string,"author_name": string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"quote": string,"rating": number,"sort_order"?: number,"source"?: string,"updated_at"?: string
                  }
                  Update: {
                    "author_meta"?: string,"author_name"?: string,"created_at"?: string,"id"?: string,"is_published"?: boolean,"quote"?: string,"rating"?: number,"sort_order"?: number,"source"?: string,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                },"values_principles": {
                  Row: {
                    "created_at": string,"id": string,"name": string,"name_ko": string,"sort_order": number,"updated_at": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"id"?: string,"name": string,"name_ko": string,"sort_order"?: number,"updated_at"?: string
                  }
                  Update: {
                    "created_at"?: string,"id"?: string,"name"?: string,"name_ko"?: string,"sort_order"?: number,"updated_at"?: string
                  }
                  Relationships: [
                    
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            [_ in never]: never
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "graphql_public": {
          Enums: {
            
          }
        },"public": {
          Enums: {
            
          }
        }
} as const
