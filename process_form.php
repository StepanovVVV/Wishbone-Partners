<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Cleaning and basic validation
    $name  = isset($_POST['name']) ? trim(htmlspecialchars($_POST['name'])) : '';
    $phone = isset($_POST['phone']) ? trim(htmlspecialchars($_POST['phone'])) : '';

    if (empty($name) || empty($phone)) {
        echo "Name and phone are required.";
        exit();
    }

    $date = date("Y-m-d H:i:s");

    // Save to file
    $file = __DIR__ . '/submissions.txt';
    $data = "Date: $date\nName: $name\nPhone: $phone\n---\n";
    file_put_contents($file, $data, FILE_APPEND);

    // Send to email
    $to = "stifvlad1601@gmail.com";
    $subject = "New form submission";
    $message = "You have received a new form submission:\n\n" . $data;
    $headers = "From: no-reply@yourdomain.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    @mail($to, $subject, $message, $headers);

    // Sending to Telegram via cURL
    $telegramToken = "8037835641:AAGgdpixuF6nEE42cBR73jVzXXV-V9-4tcQ"; // <-- replace with your token
    $chatId = "547849987"; // <-- replace with your chat_id
    $telegramMessage = "📩 New form submission:\n\n" . $data;

    $ch = curl_init("https://api.telegram.org/bot$telegramToken/sendMessage");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'chat_id' => $chatId,
        'text'    => $telegramMessage
    ]);
    curl_exec($ch);
    curl_close($ch);

    // Redirecting to the “thank you” page
    header("Location: /thank-you.html");
    exit();
} else {
    echo "Invalid request method";
}
?>
