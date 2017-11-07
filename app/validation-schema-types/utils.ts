// tslint:disable:ordered-imports max-line-length variable-name
// THIS FILE IS GENERATED BY JOI-TS-GENERATOR. ANY CHANGES MADE WILL BE LOST.

import { coerceValue } from "./library";
import * as s from "../modules/tokens/tokens.schema";
import * as t from "./types";

export const CreateTokenRequestUtils = {
  coerce: coerceValue<t.CreateTokenRequest>(s.CreateTokenRequestSchema),
};

export const CreateTokenRequestPayloadUtils = {
  coerce: coerceValue<t.CreateTokenRequestPayload>(s.CreateTokenRequestPayloadSchema),
};

export const CreateTokenResponseUtils = {
  coerce: coerceValue<t.CreateTokenResponse>(s.CreateTokenResponseSchema),
};