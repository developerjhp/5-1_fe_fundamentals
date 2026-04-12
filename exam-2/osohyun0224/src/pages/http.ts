async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    const err = new Error(
      data?.message ?? `요청에 실패했습니다. (${res.status})`,
    );
    (err as { status?: number }).status = res.status;
    (err as { data?: unknown }).data = data;
    throw err;
  }

  return res.json();
}

export const http = {
  get: <T>(url: string): Promise<T> => request<T>(url),
  post: <Req, Res>(url: string, data?: Req): Promise<Res> =>
    request<Res>(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
  delete: <T>(url: string): Promise<T> =>
    request<T>(url, { method: 'DELETE' }),
};
