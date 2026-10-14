import { createMessage, deleteMessage } from "../model/messageModel.js";

async function createMessageController(req, res) {
  const { title, text } = req.body;
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!title || !text) {
      return res.render("message", {
        user: req.user,
        errors: ["Title and message required"],
      });
    }
    await createMessage(title, text, req.user.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("message", { user: req.user, errors: ["Something went wrong"] });
  }
}

async function deleteMessageController(req, res) {
  const { message_id } = req.body;
  try {
    if (!req.user) {
      return res.redirect("/login");
    }
    if (!req.user.is_admin) {
      return res.redirect("/");
    }
    if (message_id) {
      await deleteMessage(message_id);
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
}

export { createMessageController, deleteMessageController };
