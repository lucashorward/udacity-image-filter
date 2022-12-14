import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.get("/filteredimage", async (req, res) => {
    console.log(req.query);
    if (!req.query.image_url) {
      res
        .status(400)
        .send("Image URL is missing. Send the image_url via query parameters.");
    }
    let result: string;
    try {
      result = await filterImageFromURL(req.query.image_url);
    } catch (e: unknown) {
      console.error(e);
      res.status(500).send("An internal server error has occurred. Perhaps the given URL is pointing to an invalid image?");
    }
    // This callback is called both on success and fail, so the image is deleted even if the download failed.
      res.sendFile(result, async () => {
        await deleteLocalFiles([result])
      });
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
    console.log("Thanks for checking out my project!")
  });
})();
