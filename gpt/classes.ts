import { Attachment } from 'discord.js';

type Options = 'text' | 'image';
type Content = string | Attachment;

export class AIMessageContent {
    constructor(type: 'text', content: string);
    constructor(type: 'image', content: Attachment);
    constructor(public type: Options, public content: Content) {
        this.type = type;
        if (type === 'text') {
            this.content = content as string;
        }
        if (typeof content !== 'string' && 'url' in content) {
            this.content = content.url;
        }
    }
}

export class AIMessage {
    
    role: string;
    content: AIMessageContent;
    
    constructor(role: string, content: AIMessageContent) {
        this.role = role;
        this.content = content;
    }
}