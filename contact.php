<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '.env';
$config = include '.env';

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

if (isset($_POST["send"])) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = $config['smtp_host'];
        $mail->SMTPAuth = $config['smtp_auth'];
        $mail->Username = $config['smtp_username'];
        $mail->Password = $config['smtp_password'];
        $mail->SMTPSecure = $config['smtp_secure'];
        $mail->Port = $config['smtp_port'];

        
        $mail->setFrom('yasaslekamge@gmail.com', 'Website Contact Form'); 
        $mail->addAddress('yasaslekamge@gmail.com'); 
        $mail->addReplyTo($_POST["email"], $_POST["name"]); 

        
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission: ' . $_POST["subject"];
        $mail->Body = '<h4>New Message from Your Website Contact Form</h4>'
                    . '<p><strong>Name:</strong> ' . $_POST["name"] . '</p>'
                    . '<p><strong>Email:</strong> ' . $_POST["email"] . '</p>'
                    . '<p><strong>Subject:</strong> ' . $_POST["subject"] . '</p>'
                    . '<p><strong>Message:</strong> ' . nl2br($_POST["message"]) . '</p>';

        if (!$mail->send()) {
            echo "
            <script>
                alert('Email could not be sent. Mailer Error: " . $mail->ErrorInfo . "');
            </script>
            ";
        } else {
            echo "
                <style>
                    .custom-alert {
                        padding: 20px;
                        background-color: #4CAF50;
                        color: white;
                        text-align: center;
                        border-radius: 5px;
                        position: fixed;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 1000;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                        animation: fadeOut 2s 4s forwards;
                    }
                    @keyframes fadeOut {
                        to {
                            opacity: 0;
                            visibility: hidden;
                        }
                    }
                </style>
                <div class='custom-alert'>Email Sent Successfully</div>
                <script>
                    setTimeout(function() {
                        document.location.href = 'index.php';
                    }, 4000);
                </script>
            ";

        }
    } catch (Exception $e) {
        echo "
        <script>
            alert('Email could not be sent. Exception Error: {$e->getMessage()}');
        </script>
        ";
    }
}

?>
