export interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  id_token: string | null;
  not_before_policy: number;
  session_state: string;
  scope: string;
  error?: string | null;
  error_description?: string | null;
  error_uri?: string | null;
}
