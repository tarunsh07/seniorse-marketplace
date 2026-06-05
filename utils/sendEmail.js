const sendOtpEmail = async (email, otp) => {
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Welcome to SeniorSe!</h2>
            <p>Your One-Time Password (OTP) for verifying your college ID is:</p>
            <h1 style="color: #FE6602; letter-spacing: 5px; font-size: 40px;">${otp}</h1>
            <p>Please enter this code on the website to complete your registration.</p>
            <br>
            <small style="color: gray;">If you did not request this, please ignore this email.</small>
        </div>
    `;

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            sender: { email: "seniorse.help@gmail.com", name: "SeniorSe Verification" },
            to: [{ email: email }],
            subject: "Your SeniorSe OTP Verification Code",
            htmlContent: emailHtml
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send email via Brevo API");
    }
};

module.exports = sendOtpEmail;
