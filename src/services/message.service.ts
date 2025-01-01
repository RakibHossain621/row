import { APIRequest } from './api-request';
import { getGlobalConfig } from './config';

export class MessageService extends APIRequest {
  getConversations(query?: Record<string, any>) {
    return this.get(this.buildUrl('/conversations', query));
  }

  searchConversations(query?: Record<string, any>) {
    return this.get(this.buildUrl('/conversations/search', query));
  }

  createConversation(data: Record<string, string>) {
    return this.post('/conversations', data);
  }

  getConversationDetail(id: string) {
    return this.get(`/conversations/${id}`);
  }

  getMessages(conversationId: string, query?: Record<string, any>) {
    return this.get(this.buildUrl(`/messages/conversations/${conversationId}`, query));
  }

  loadMuteUsers(query?: Record<string, any>) {
    return this.get(this.buildUrl('/messages/mute-users', query));
  }

  sendMessage(conversationId: string, data: Record<string, any>) {
    return this.post(`/messages/conversations/${conversationId}`, data);
  }

  countTotalNotRead() {
    return this.get('/messages/counting-not-read-messages');
  }

  readAllInConversation(conversationId: string) {
    return this.post(`/messages/read-all/${conversationId}`);
  }

  getMessageUploadUrl() {
    const config = getGlobalConfig();
    return `${config.NEXT_PUBLIC_API_ENDPOINT}/messages/private/file`;
  }

  getConversationByStreamId(streamId: string) {
    return this.get(`/conversations/stream/${streamId}`);
  }

  getPublicMessages(conversationId: string, query?: Record<string, any>) {
    return this.get(this.buildUrl(`/messages/conversations/public/${conversationId}`, query));
  }

  sendStreamMessage(conversationId: string, data: Record<string, any>) {
    return this.post(`/messages/stream/conversations/${conversationId}`, data);
  }

  sendPublicStreamMessage(conversationId: string, data: Record<string, any>) {
    return this.post(`/messages/stream/public/conversations/${conversationId}`, data);
  }

  findPublicConversationPerformer(performerId: string) {
    return this.get(`/conversations/stream/public/${performerId}`);
  }

  deleteMessage(id) {
    return this.del(`/messages/${id}`);
  }

  deleteAllMessageInConversation(conversationId) {
    return this.del(`/messages/${conversationId}/remove-all-message`);
  }

  updateConversationName(conversationId, data) {
    return this.put(`/conversations/${conversationId}/update`, data);
  }

  muteUser(conversationId, data) {
    return this.post(`/messages/mute-user/${conversationId}`, data);
  }

  checkMuteUser(performerId) {
    return this.get(this.buildUrl(`/messages/check-mute-chat/${performerId}`));
  }

  unMuteUser(id) {
    return this.del((`/messages/mute-user/${id}`));
  }

  deleteConversation(conversationId) {
    return this.del(`/conversations/${conversationId}`);
  }
}

export const messageService = new MessageService();
