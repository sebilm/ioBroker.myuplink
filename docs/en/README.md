# ioBroker.myuplink

This ioBroker adapter receives data from myUplink.com. Settings that have been enabled for this by myUplink can be changed.

## Using this adapter

1. You need a myUplink compatible heat pump from NIBE, AIT, Cetetherm, ClimateMaster, Contura, CTA, CTC, Enertech Global or Høiax - buy one if you don't have ;-)
2. You need an account at myUplink: https://myuplink.com
3. Go to myUplink Api: https://dev.myuplink.com and log in
4. Click "Applications" and then "Create New Application"
5. Fill in: Name and Description can be everything e.g. ioBroker
6. The Callback URL is important for Authorization Code Grant Flow. You can use https://sebilm.github.io/ioBroker.myuplink/myuplink.html
7. Accept the myUplink API Services Agreement and click "Create"
8. Then you get an Identifier and a Secret - we need them
9. Install this adapter in ioBroker
10. At adapter setting page fill in the Identifier and the Secret.
11. Choose your language and all other settings.
12. Click Save and Close

Each device has an object in the object tree called `setData`. You can enter a JSON object of the form

```json
{
    "12345": "42",
    "23456": "1"
}
```

in this object. This makes it possible to send and change several data points to the API at the same time.
It can also be used to change data points that are not sent by the API.

## How the adapter works

The adapter retrieves the list of systems and devices from the myUplink API every x minutes (depending on the setting). It then
retrieves the available parameters for each device and saves them in the object tree. If myUplink sends new parameters in the process,
these are automatically added to the object tree.

The adapter generally does not delete any objects so that data is not lost if myUplink does not send a parameter.

The adapter also has no influence on which parameters are sent by myUplink.
