<?php
use MailerSend\MailerSend;
use MailerSend\Helpers\Builder\Recipient;
use MailerSend\Helpers\Builder\EmailParams;

require_once __DIR__ . '/../vendor/autoload.php';

class PHPMailerHelper
{
    public static function sendMail($to, $subject, $body, $fromEmail, $fromName)
    {
        try {
            $mailersend = new MailerSend(['api_token' => 'mlsn.0d4ddaf1ff310441650c2e84fe35849bebcd6a657ece0d99764782d2015519fb']);

            $recipients = [
                new Recipient($to, $to),
            ];

            $emailParams = (new EmailParams())
                ->setFrom($fromEmail)
                ->setFromName($fromName)
                ->setRecipients($recipients)
                ->setSubject($subject)
                ->setHtml(nl2br($body))
                ->setText($body);

            $mailersend->email->send($emailParams);

            return [
                "success" => true,
                "message" => "Your message has been sent successfully."
            ];
        } catch (\Exception $e) {
            error_log("MailerSend error: " . $e->getMessage());
            return [
                "success" => false,
                "error" => "Failed to send your message. Please try again later."
            ];
        }
    }
}
?>