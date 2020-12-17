/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "./components/Table";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere-bg.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/?include=contactLists.list,contactTags,contactDeals,organization,geoIps,fieldValue`,
        {
          headers: {
            "Api-Token":
              "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
          },
        }
      )
      .then((res) => {
        const contacts = res?.data?.contacts;
        console.log(contacts);
        if (contacts) {
          let total = contacts.length;
          var promise = new Promise((resolve, reject) => {
            contacts.forEach((user) => {
              if (user.contactDeals[0]) {
                axios
                  .get(
                    "https://cors-anywhere-bg.herokuapp.com/https://sahmed93846.api-us1.com/api/3/deals/" +
                      user?.contactDeals[0],
                    {
                      headers: {
                        "Api-Token":
                          "bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0",
                      },
                    }
                  )
                  .then((deal) => {
                    console.log(deal);
                    user.dealTitle = deal.data.deal.title;
                    total--;
                    if (total <= 0) resolve();
                  });
              } else {
                total--;
                if (total <= 0) resolve();
              }
            });
          });
        }
        promise.then(() => {
          setUsers(contacts);
        });
      });
  }, []);

  return (
    <div>
      {!users ? (
        <div>Loading</div>
      ) : (
        <ThemeProvider theme={theme}>
          <Table rows={users} />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
