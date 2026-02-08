import { Page } from '@playwright/test';

export class TestDataFactory {
  private createdIds: { type: string; id: string }[] = [];
  private token: string | null = null;

  constructor(private page: Page) {}

  private async getToken(): Promise<string> {
    if (this.token) return this.token;
    const storage = await this.page.context().storageState();
    // TODO: Extract auth token from your storage format
    // Example for localStorage-based auth:
    const authState = storage.origins[0]?.localStorage?.find(
      (item) => item.name === 'auth-token'
    );
    this.token = authState?.value || '';
    return this.token;
  }

  private async apiRequest(method: string, url: string, data?: unknown) {
    const token = await this.getToken();
    const baseURL = process.env.API_URL || 'http://localhost:8000';
    const response = await fetch(`${baseURL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  }

  // TODO: Add factory methods for your domain objects
  // Example:
  // async createItem(data: { name: string; price?: number }) {
  //   const result = await this.apiRequest('POST', '/api/items', data);
  //   this.createdIds.push({ type: 'item', id: result.id });
  //   return result;
  // }

  async cleanup() {
    // Delete all created test data in reverse order
    for (const { type, id } of this.createdIds.reverse()) {
      try {
        await this.apiRequest('DELETE', `/api/${type}s/${id}`);
      } catch {
        // Ignore cleanup errors
      }
    }
    this.createdIds = [];
  }
}
