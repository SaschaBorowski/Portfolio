<?php
// 1. Überprüfen, ob die Anfrage eine POST-Anfrage ist
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // "Method Not Allowed"
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}

// 2. JSON-Daten abrufen und dekodieren
$data = json_decode(file_get_contents('php://input'), true);

// 3. Eingaben bereinigen und validieren
$name = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
$email = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
$message = filter_var($data['message'] ?? '', FILTER_SANITIZE_STRING);
$privacyPolicy = filter_var($data['privacyPolicy'] ?? '', FILTER_VALIDATE_BOOLEAN);

$errors = [];

// Name-Validierung
if (empty($name) || !preg_match('/^[a-zA-Z\s]+$/', $name)) {
    $errors[] = "Invalid name. Only letters and spaces are allowed.";
}

// E-Mail-Validierung
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}

// Nachricht-Validierung
if (empty($message)) {
    $errors[] = "Message field cannot be empty.";
}

// Privacy-Policy-Validierung
if (!$privacyPolicy) {
    $errors[] = "You must accept the privacy policy.";
}

// 4. Bei Fehlern Fehlerantwort senden
if (!empty($errors)) {
    http_response_code(400); // "Bad Request"
    echo json_encode(["status" => "error", "errors" => $errors]);
    exit;
}

// 5. E-Mail-Versand vorbereiten
$to = "developer@borowski-sascha.de"; // Ersetze dies durch deine E-Mail-Adresse
$subject = "New Contact Form Submission";

// Nachricht formatieren
$emailMessage = "You have received a new message from the contact form:\n\n";
$emailMessage .= "Name: $name\n";
$emailMessage .= "Email: $email\n";
$emailMessage .= "Message: $message\n";

// Header setzen
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

// 6. E-Mail senden und Rückmeldung geben
if (mail($to, $subject, $emailMessage, $headers)) {
    echo json_encode(["status" => "success", "message" => "Email sent successfully!"]);
} else {
    http_response_code(500); // "Internal Server Error"
    echo json_encode(["status" => "error", "message" => "Failed to send the email."]);
}
?>
