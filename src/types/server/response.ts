type OKResponse = {
  ok: true;
  message: any;
};

type ErrorResponse = {
  ok: false;
  description: any;
};

type APIResponse = OKResponse | ErrorResponse;

export default APIResponse;
