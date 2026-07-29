import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const DEFAULT_CRM_FORMS = {
  venta: "https://crm.elduenovende.com/widget/form/u3QrthKIOTQruMw3nQYm",
  prestamos: "https://crm.elduenovende.com/widget/form/S6iHSWHXhpO9XeNZHIIW",
  arquitectura: "https://crm.elduenovende.com/widget/form/AN9vf1chdm2GEz4xFLVX",
  contacto: "https://crm.elduenovende.com/widget/form/gnolY2xzWsk8vN2HW0Lc",
};

export type CrmFormType = keyof typeof DEFAULT_CRM_FORMS;

export function useCrmFormUrl(type: CrmFormType): string {
  const [url, setUrl] = useState<string>(DEFAULT_CRM_FORMS[type]);

  useEffect(() => {
    let isMounted = true;
    async function loadCrmFormUrl() {
      try {
        const { data } = await supabase
          .from("properties")
          .select("owner")
          .eq("id", "prop-site-settings")
          .maybeSingle();

        if (isMounted && data?.owner?.crmForms && data.owner.crmForms[type]) {
          setUrl(data.owner.crmForms[type]);
        }
      } catch (err) {
        console.error("Error loading CRM form URL for", type, err);
      }
    }
    loadCrmFormUrl();

    return () => {
      isMounted = false;
    };
  }, [type]);

  return url;
}
