import { Router } from "express";

// Import controllers and middleware as needed
import {
  createShortUrlController,
  redirectController,
  getShortUrlAnalyticsController,
  updateShortUrlController,
  deleteShortUrlController,
  listUserShortUrlsController,
  generateQRCodeController,
} from "../controllers/url.Controllers";

import { checkAuth } from "../middlewares/checkAuth";
import {
  shortenUrlSchema,
  deleteUrlSchema,
  updateUrlSchema,
  QrCodeUrlSchema,
  redirectUrlSchema,
  analyticsSchema,
} from "../schema/url/urlSchema";
import validate from "../middlewares/validateResource";

// Initialize router
const router = Router();

// Route to create a short URL for a given long URL
router.post(
  "/shorten",
  [validate(shortenUrlSchema), checkAuth],
  createShortUrlController
);

// Route to handle requests to a short URL and redirect users to the original long URL
router.get(
  "/redirect/:shortCode",
  validate(redirectUrlSchema),
  redirectController
);

// Route to retrieve analytics data for a specific short URL
router.get(
  "/:shortCode/analytics",
  [validate(analyticsSchema), checkAuth],
  getShortUrlAnalyticsController
);

// Route to update properties of a short URL
router.patch(
  "/:shortCode/update",
  [validate(updateUrlSchema), checkAuth],
  updateShortUrlController
);

// Route to delete a short URL
router.delete(
  "/:shortCode/delete",
  [validate(deleteUrlSchema), checkAuth],
  deleteShortUrlController
);

// Route to retrieve a list of short URLs created by the authenticated user
router.get("/my-short-urls", checkAuth, listUserShortUrlsController);

// Route to generate a QR code for a short URL
router.get("/qr-code", validate(QrCodeUrlSchema), generateQRCodeController);

export default router;