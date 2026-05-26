import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const {
      customer_name,
      customer_email,
      customer_phone,
      company_name,
      company_website,
      selected_date,
      selected_time,
      selected_timezone,
    } = body;

    if (!customer_name || !customer_email) {
      return new Response(
        JSON.stringify({ error: "Name and email are required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const adminEmail = Deno.env.get("ADMIN_EMAIL");
    const fromEmail = Deno.env.get("FROM_EMAIL");

    if (!supabaseUrl || !serviceRoleKey || !resendApiKey || !adminEmail || !fromEmail) {
      throw new Error("Missing required environment variables.");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error: insertError } = await supabase.from("demo_bookings").insert({
      customer_name,
      customer_email,
      customer_phone,
      company_name,
      company_website,
      selected_date,
      selected_time,
      selected_timezone,
      status: "new",
    });

    if (insertError) {
      throw insertError;
    }

    const adminEmailHtml = `
      <h2>New Missless AI demo booking</h2>
      <p><strong>Name:</strong> ${customer_name}</p>
      <p><strong>Email:</strong> ${customer_email}</p>
      <p><strong>Phone:</strong> ${customer_phone || "Not provided"}</p>
      <p><strong>Company:</strong> ${company_name || "Not provided"}</p>
      <p><strong>Website:</strong> ${company_website || "Not provided"}</p>
      <p><strong>Date:</strong> ${selected_date || "Not provided"}</p>
      <p><strong>Time:</strong> ${selected_time || "Not provided"}</p>
      <p><strong>Timezone:</strong> ${selected_timezone || "Not provided"}</p>
    `;

    const customerEmailHtml = `
      <h2>Your Missless AI demo request has been received</h2>
      <p>Hi ${customer_name},</p>
      <p>Thank you for booking a demo with Missless AI.</p>
      <p>We received your request and our team will contact you shortly.</p>
      <p>
        <strong>Your selected time:</strong><br/>
        ${selected_date || ""} ${selected_time || ""}<br/>
        ${selected_timezone || ""}
      </p>
      <p>Best,<br/>Missless AI</p>
    `;

    const sendEmail = async ({
      to,
      subject,
      html,
    }: {
      to: string;
      subject: string;
      html: string;
    }) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to,
          subject,
          html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Resend email failed: ${errorText}`);
      }
    };

  // Emails are disabled for now.
// Bookings are saved in Supabase and can be reviewed in the demo_bookings table.

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Something went wrong.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});