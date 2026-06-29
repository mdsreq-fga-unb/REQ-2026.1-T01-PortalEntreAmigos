import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException
from django.conf import settings

def enviar_email_brevo(destinatario, nome, corpo):
    configuration = sib_api_v3_sdk.Configuration()
    configuration.api_key['api-key'] = settings.BREVO_API_KEY

    api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
        sib_api_v3_sdk.ApiClient(configuration)
    )

    email = sib_api_v3_sdk.SendSmtpEmail(
        to=[{"email": destinatario, "name": nome}],
        sender={"email": settings.DEFAULT_FROM_EMAIL, "name": "Portal Entre Amigos"},
        subject='Portal Entre Amigos',
        text_content=corpo
    )

    try:
        api_instance.send_transac_email(email)
        print(f"Email enviado via Brevo API para {destinatario}")
    except ApiException as e:
        print(f"ERRO Brevo API: {e}")