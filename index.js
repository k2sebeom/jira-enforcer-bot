/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */

function makeComment(body, context) {
  const comment = context.issue({
    body: body,
  });
  return context.octokit.issues.createComment(comment);
}

module.exports = (app) => {
  app.log.info("Yay, the app was loaded!");

  app.on(["pull_request.opened", "pull_request.edited"], async (context) => {
    app.log.info("PR received");
    let prBody = context.payload.pull_request.body;
    let title = context.payload.pull_request.title;

    const regex = /MUS-[0-9]{3,}/g;
    let inBody = prBody.match(regex);
    const inTitle = title.match(regex);
    
    // If body contains ticket number
    if(inBody) {
      // But title does not
      if(!inTitle) {
        const updatePayload = context.pullRequest({
          title: "[" + inBody[0] + "] " + title
        });
        context.octokit.pulls.update(updatePayload);
        return makeComment("It's always good to include a ticket number in your pr title. :smile:", context);
      }
    }
    else { // If body does not contain ticket number
      // But title does
      if(inTitle) {
        const updatePayload = context.pullRequest({
          body: prBody.replace("[Ticket_Number](", "[" + inTitle[0] + "](").replace("/[Ticket_Number]", "/" + inTitle[0])
        });
        context.octokit.pulls.update(updatePayload);
        makeComment("It looks like your pull request template does not contain JIRA ticket number. I handled it for you :+1:", context);
      }
      // None has ticket number
      else {
        makeComment("You forgot to include a correct JIRA ticket number!! :rage: :rage: I am utterly disappointed!! A good engineer will always keep JIRA updated :fire:", context)
      }
    }
  });
};
