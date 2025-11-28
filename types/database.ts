export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5';
  };
  public: {
    Tables: {
      attack: {
        Row: {
          damage: number | null;
          damage_modifier: string | null;
          effect: string | null;
          energy_cost: Database['public']['Enums']['color'][];
          id: number;
          name: string;
          pokemon_card_id: string;
        };
        Insert: {
          damage?: number | null;
          damage_modifier?: string | null;
          effect?: string | null;
          energy_cost: Database['public']['Enums']['color'][];
          id?: never;
          name: string;
          pokemon_card_id: string;
        };
        Update: {
          damage?: number | null;
          damage_modifier?: string | null;
          effect?: string | null;
          energy_cost?: Database['public']['Enums']['color'][];
          id?: never;
          name?: string;
          pokemon_card_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'attack_pokemon_card_id_fkey';
            columns: ['pokemon_card_id'];
            isOneToOne: false;
            referencedRelation: 'pokemon_card';
            referencedColumns: ['id'];
          }
        ];
      };
      booster_pack: {
        Row: {
          id: number;
          name: string;
          release_date: string;
          set_symbol: string;
          symbol: string;
        };
        Insert: {
          id?: never;
          name: string;
          release_date: string;
          set_symbol: string;
          symbol: string;
        };
        Update: {
          id?: never;
          name?: string;
          release_date?: string;
          set_symbol?: string;
          symbol?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'booster_pack_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set';
            referencedColumns: ['symbol'];
          },
          {
            foreignKeyName: 'booster_pack_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set_overview';
            referencedColumns: ['symbol'];
          }
        ];
      };
      card: {
        Row: {
          card_type: Database['public']['Enums']['card_type'];
          id: string;
          image_path: string;
          name: string;
          rarity: Database['public']['Enums']['rarity'];
          set_number: number;
          set_symbol: string;
        };
        Insert: {
          card_type: Database['public']['Enums']['card_type'];
          id?: string;
          image_path: string;
          name: string;
          rarity: Database['public']['Enums']['rarity'];
          set_number: number;
          set_symbol: string;
        };
        Update: {
          card_type?: Database['public']['Enums']['card_type'];
          id?: string;
          image_path?: string;
          name?: string;
          rarity?: Database['public']['Enums']['rarity'];
          set_number?: number;
          set_symbol?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'card_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set';
            referencedColumns: ['symbol'];
          },
          {
            foreignKeyName: 'card_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set_overview';
            referencedColumns: ['symbol'];
          }
        ];
      };
      card_booster_pack_link: {
        Row: {
          booster_pack_id: number;
          card_id: string;
        };
        Insert: {
          booster_pack_id: number;
          card_id: string;
        };
        Update: {
          booster_pack_id?: number;
          card_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'card_booster_pack_link_booster_pack_id_fkey';
            columns: ['booster_pack_id'];
            isOneToOne: false;
            referencedRelation: 'booster_pack';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'card_booster_pack_link_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'card_booster_pack_link_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card_view';
            referencedColumns: ['id'];
          }
        ];
      };
      deck: {
        Row: {
          author: string;
          colors: Database['public']['Enums']['color'][];
          created_at: string;
          description: string | null;
          id: string;
          likes_count: number;
          public: boolean;
          title: string;
        };
        Insert: {
          author: string;
          colors: Database['public']['Enums']['color'][];
          created_at?: string;
          description?: string | null;
          id?: string;
          likes_count?: number;
          public: boolean;
          title: string;
        };
        Update: {
          author?: string;
          colors?: Database['public']['Enums']['color'][];
          created_at?: string;
          description?: string | null;
          id?: string;
          likes_count?: number;
          public?: boolean;
          title?: string;
        };
        Relationships: [];
      };
      deck_card_link: {
        Row: {
          card_id: string;
          deck_id: string;
          quantity: number;
        };
        Insert: {
          card_id: string;
          deck_id: string;
          quantity: number;
        };
        Update: {
          card_id?: string;
          deck_id?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'deck_card_link_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deck_card_link_card_id_fkey';
            columns: ['card_id'];
            isOneToOne: false;
            referencedRelation: 'card_view';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deck_card_link_deck_id_fkey';
            columns: ['deck_id'];
            isOneToOne: false;
            referencedRelation: 'deck';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deck_card_link_deck_id_fkey';
            columns: ['deck_id'];
            isOneToOne: false;
            referencedRelation: 'deck_overview';
            referencedColumns: ['id'];
          }
        ];
      };
      deck_likes: {
        Row: {
          deck_id: string;
          user_id: string;
        };
        Insert: {
          deck_id: string;
          user_id: string;
        };
        Update: {
          deck_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'deck_likes_deck_id_fkey';
            columns: ['deck_id'];
            isOneToOne: false;
            referencedRelation: 'deck';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'deck_likes_deck_id_fkey';
            columns: ['deck_id'];
            isOneToOne: false;
            referencedRelation: 'deck_overview';
            referencedColumns: ['id'];
          }
        ];
      };
      pokemon_card: {
        Row: {
          ability_effect: string | null;
          ability_name: string | null;
          hp: number;
          id: string;
          is_ex: boolean;
          retreat_cost: number;
          stage: Database['public']['Enums']['stage'];
          type: Database['public']['Enums']['color'];
          weakness: Database['public']['Enums']['color'] | null;
        };
        Insert: {
          ability_effect?: string | null;
          ability_name?: string | null;
          hp: number;
          id: string;
          is_ex: boolean;
          retreat_cost: number;
          stage: Database['public']['Enums']['stage'];
          type: Database['public']['Enums']['color'];
          weakness?: Database['public']['Enums']['color'] | null;
        };
        Update: {
          ability_effect?: string | null;
          ability_name?: string | null;
          hp?: number;
          id?: string;
          is_ex?: boolean;
          retreat_cost?: number;
          stage?: Database['public']['Enums']['stage'];
          type?: Database['public']['Enums']['color'];
          weakness?: Database['public']['Enums']['color'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'pokemon_card_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'pokemon_card_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'card_view';
            referencedColumns: ['id'];
          }
        ];
      };
      set: {
        Row: {
          name: string;
          release_date: string;
          symbol: string;
        };
        Insert: {
          name: string;
          release_date: string;
          symbol: string;
        };
        Update: {
          name?: string;
          release_date?: string;
          symbol?: string;
        };
        Relationships: [];
      };
      trainer_card: {
        Row: {
          effect: string;
          hp: number | null;
          id: string;
          trainer_card_type: Database['public']['Enums']['trainer_card_type'];
        };
        Insert: {
          effect: string;
          hp?: number | null;
          id: string;
          trainer_card_type: Database['public']['Enums']['trainer_card_type'];
        };
        Update: {
          effect?: string;
          hp?: number | null;
          id?: string;
          trainer_card_type?: Database['public']['Enums']['trainer_card_type'];
        };
        Relationships: [
          {
            foreignKeyName: 'trainer_card_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'card';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'trainer_card_id_fkey';
            columns: ['id'];
            isOneToOne: true;
            referencedRelation: 'card_view';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      card_view: {
        Row: {
          attacks: Json | null;
          hp: number | null;
          id: string | null;
          image_path: string | null;
          is_ex: boolean | null;
          name: string | null;
          pack_names: string[] | null;
          pack_symbols: string[] | null;
          rarity: Database['public']['Enums']['rarity'] | null;
          retreat_cost: number | null;
          set_name: string | null;
          set_symbol: string | null;
          stage: Database['public']['Enums']['stage'] | null;
          type: Database['public']['Enums']['color'] | null;
          weakness: Database['public']['Enums']['color'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'card_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set';
            referencedColumns: ['symbol'];
          },
          {
            foreignKeyName: 'card_set_symbol_fkey';
            columns: ['set_symbol'];
            isOneToOne: false;
            referencedRelation: 'set_overview';
            referencedColumns: ['symbol'];
          }
        ];
      };
      deck_overview: {
        Row: {
          author: string | null;
          cards: Json | null;
          colors: Database['public']['Enums']['color'][] | null;
          created_at: string | null;
          description: string | null;
          id: string | null;
          likes_count: number | null;
          public: boolean | null;
          title: string | null;
        };
        Relationships: [];
      };
      set_overview: {
        Row: {
          name: string | null;
          packs: Json | null;
          symbol: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      create_deck: {
        Args: {
          p_author: string;
          p_cards: Json;
          p_colors: Database['public']['Enums']['color'][];
          p_description: string;
          p_public: boolean;
          p_title: string;
        };
        Returns: undefined;
      };
      create_pokemon_card: {
        Args: {
          ability_effect: string;
          ability_name: string;
          attack_1_damage: number;
          attack_1_damage_modifier: string;
          attack_1_effect: string;
          attack_1_energy_cost: Database['public']['Enums']['color'][];
          attack_1_name: string;
          attack_2_damage: number;
          attack_2_damage_modifier: string;
          attack_2_effect: string;
          attack_2_energy_cost: Database['public']['Enums']['color'][];
          attack_2_name: string;
          card_type: Database['public']['Enums']['card_type'];
          hp: number;
          id: string;
          image_path: string;
          is_ex: boolean;
          name: string;
          pack_ids: number[];
          rarity: Database['public']['Enums']['rarity'];
          retreat_cost: number;
          set_number: number;
          set_symbol: string;
          stage: Database['public']['Enums']['stage'];
          type: Database['public']['Enums']['color'];
          weakness: Database['public']['Enums']['color'];
        };
        Returns: undefined;
      };
      create_trainer_card: {
        Args: {
          card_type: Database['public']['Enums']['card_type'];
          effect: string;
          hp: number;
          id: string;
          image_path: string;
          name: string;
          pack_ids: number[];
          rarity: Database['public']['Enums']['rarity'];
          set_number: number;
          set_symbol: string;
          trainer_card_type: Database['public']['Enums']['trainer_card_type'];
        };
        Returns: undefined;
      };
      get_enum_values: { Args: { enum_type_name: string }; Returns: string[] };
      like_deck: { Args: { p_deck_id: string }; Returns: undefined };
    };
    Enums: {
      card_type: 'pokemon' | 'trainer';
      color:
        | 'grass'
        | 'fire'
        | 'water'
        | 'lightning'
        | 'psychic'
        | 'fighting'
        | 'darkness'
        | 'metal'
        | 'dragon'
        | 'colorless';
      rarity:
        | 'diamond_1'
        | 'diamond_2'
        | 'diamond_3'
        | 'diamond_4'
        | 'star_1'
        | 'star_2'
        | 'star_3'
        | 'crown'
        | 'promo';
      stage: 'Basic' | 'Stage 1' | 'Stage 2';
      trainer_card_type: 'Supporter' | 'Item' | 'Item (Fossil)' | 'Pokemon Tool';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      card_type: ['pokemon', 'trainer'],
      color: [
        'grass',
        'fire',
        'water',
        'lightning',
        'psychic',
        'fighting',
        'darkness',
        'metal',
        'dragon',
        'colorless',
      ],
      rarity: [
        'diamond_1',
        'diamond_2',
        'diamond_3',
        'diamond_4',
        'star_1',
        'star_2',
        'star_3',
        'crown',
        'promo',
      ],
      stage: ['Basic', 'Stage 1', 'Stage 2'],
      trainer_card_type: ['Supporter', 'Item', 'Item (Fossil)', 'Pokemon Tool'],
    },
  },
} as const;
