import { Router } from "express";

const router = Router();
// Create static routes to dynamic routes top to bottom

router.get("/", (req, res) => {
  res.send("User List");
});

router.get("/new", (req, res) => {
  res.send("New User Form");
});

router
  .route("/:userId")
  .get((req, res) => {
    req.params.userId;
    res.send(`Get user with ID ${req.params.userId}`);
  })
  .put((req, res) => {
    req.params.userId;
    res.send(`Update user with ID ${req.params.userId}`);
  })
  .delete((req, res) => {
    req.params.userId;
    res.send(`Delete user with ID ${req.params.userId}`);
  });

// router.get("/:userId", (req, res) => {
//   req.params.userId;
//   res.send(`Get user with ID ${req.params.userId}`);
// });
// router.put("/:userId", (req, res) => {
//   req.params.userId;
//   res.send(`Update user with ID ${req.params.userId}`);
// });
// router.delete("/:userId", (req, res) => {
//   req.params.userId;
//   res.send(`Delete user with ID ${req.params.userId}`);
// });

export default router;
