## Send Email Edge Function

This Edge Function handles email sending using the Resend API.

### Setup

1. Deploy the function:
```bash
supabase functions deploy send-email
```

2. Set environment variable:
```bash
supabase secrets set RESEND_API_KEY=re_5UetCGmk_8MJY9BCFY3VMKkt6ENzCJy2A
```

### Testing

Test the function locally:
```bash
supabase functions serve send-email --env-file ./supabase/functions/send-email/.env
```

Example request:
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<h1>Test</h1><p>This is a test email.</p>"
  }'
```