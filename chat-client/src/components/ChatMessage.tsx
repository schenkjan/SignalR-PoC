import { FunctionComponent } from 'react';
import './ChatMessage.css';

type ChatMessageProps = {
    message: string
}

export const ChatMessage: FunctionComponent<ChatMessageProps> = ( {message }) => {
    return (
        <section className="message">
            {message}
        </section>
    );
}