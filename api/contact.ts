import { Resend } from 'resend';


// =====================================
// RESEND
// =====================================

const resend =
    new Resend(
        process.env.RESEND_API_KEY
    );


// =====================================
// TYPES
// =====================================

interface ContactRequest {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}


// =====================================
// ESCAPE HTML
// =====================================

function escapeHtml(value: string): string {

    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

}


// =====================================
// API HANDLER
// =====================================

export default async function handler(
    request: any,
    response: any
) {

    // =====================================
    // METHOD
    // =====================================

    if (request.method !== 'POST') {

        return response.status(405).json({
            success: false,
            message: 'Method not allowed.'
        });

    }


    try {

        const body =
            request.body as ContactRequest;


        const name =
            body.name?.trim() ?? '';

        const email =
            body.email?.trim() ?? '';

        const subject =
            body.subject?.trim() ?? '';

        const message =
            body.message?.trim() ?? '';


        // =====================================
        // VALIDATION
        // =====================================

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return response.status(400).json({
                success: false,
                message:
                    'Niet alle velden zijn ingevuld.'
            });

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            return response.status(400).json({
                success: false,
                message:
                    'Ongeldig e-mailadres.'
            });

        }


        // =====================================
        // SEND EMAIL
        // =====================================

        const {
            data,
            error
        } = await resend.emails.send({

         from:
    'Portfolio <contact@jelmervandermeer.nl>',

to: [
    'jelmer@jelmervandermeer.nl'
],

            replyTo:
                email,

            subject:
                `Portfolio: ${subject}`,

            html: `
                <div
                    style="
                        font-family: Arial, sans-serif;
                        max-width: 650px;
                        margin: 0 auto;
                        padding: 30px;
                    "
                >
                    <h1>
                        Nieuw bericht via je portfolio
                    </h1>

                    <p>
                        Er is een nieuw bericht verstuurd via
                        jelmervandermeer.nl.
                    </p>

                    <hr>

                    <p>
                        <strong>Naam:</strong><br>
                        ${escapeHtml(name)}
                    </p>

                    <p>
                        <strong>E-mail:</strong><br>
                        ${escapeHtml(email)}
                    </p>

                    <p>
                        <strong>Onderwerp:</strong><br>
                        ${escapeHtml(subject)}
                    </p>

                    <p>
                        <strong>Bericht:</strong><br>
                        ${escapeHtml(message)
                            .replaceAll(
                                '\n',
                                '<br>'
                            )}
                    </p>

                    <hr>

                    <p>
                        Je kunt rechtstreeks antwoorden
                        op deze e-mail.
                    </p>
                </div>
            `
        });


        // =====================================
        // RESEND ERROR
        // =====================================

        if (error) {

            console.error(
                'Resend error:',
                error
            );

            return response.status(500).json({
                success: false,
                message:
                    'E-mail kon niet worden verzonden.'
            });

        }


        // =====================================
        // SUCCESS
        // =====================================

        return response.status(200).json({
            success: true,
            id: data?.id
        });

    }
    catch (error) {

        console.error(
            'Contact API error:',
            error
        );


        return response.status(500).json({
            success: false,
            message:
                'Er is een onverwachte fout opgetreden.'
        });

    }

}