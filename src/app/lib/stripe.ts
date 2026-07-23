import Stripe from "stripe";
import { envVars } from "../config/env";

export const stripe = new Stripe(envVars.SCRIPE_SECRET_KEY);
