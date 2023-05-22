var colors = [
  "#F3FF38",
  "#9B18CE",
  "#38F3FF",
  "#173B68",
  "#C6C6C6",
  "#4A78EE",
  "#FF6D00",
  "#18CE40",
  "#EE4A78",
  "#17683B",
];
var reqChartRef;
var candChartRef;

function ChartTable() {
  const { useState } = React;
  const [requirements, setRequirements] = useState([
    {
      id: 1,
      client_name: "Microsoft",
      role: "Devops",
      max_ctc: 3000000,
      min_ctc: 2000000,
      positions: 5,
      status: "OPEN",
    },
    {
      id: 2,
      client_name: "Amazon",
      role: "Alexa Developer",
      max_ctc: 3500000,
      min_ctc: 2200000,
      positions: 8,
      status: "OPEN",
    },
    {
      id: 3,
      client_name: "Adobe",
      role: "Frontend Developer",
      max_ctc: 7000000,
      min_ctc: 5000000,
      positions: 2,
      status: "CLOSED",
    },
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      requirement_id: 2,
      name: "Tarun",
      status: "ONGOING",
      offered_ctc: 30000000,
      discovered_on: "2022-06-07",
      discovered_by: "Ramesh",
    },
    {
      id: 2,
      requirement_id: 1,
      name: "Arun",
      status: "DROPPED",
      offered_ctc: 20000000,
      discovered_on: "2022-08-06",
      discovered_by: "Ramesh",
    },
    {
      id: 3,
      requirement_id: 3,
      name: "Varun",
      status: "ONGOING",
      offered_ctc: 50000000,
      discovered_on: "2022-03-06",
      discovered_by: "Ramesh",
    },
    {
      id: 4,
      requirement_id: 2,
      name: "Kiran",
      status: "ONGOING",
      offered_ctc: 30000000,
      discovered_on: "2022-07-10",
      discovered_by: "Ramesh",
    },
    {
      id: 5,
      requirement_id: 2,
      name: "Charan",
      status: "ONGOING",
      offered_ctc: 30000000,
      discovered_on: "2022-10-06",
      discovered_by: "Ramesh",
    },
    {
      id: 6,
      requirement_id: 1,
      name: "Sharan",
      status: "ONGOING",
      offered_ctc: 30000000,
      discovered_on: "2023-04-06",
      discovered_by: "Ramesh",
    },
    {
      id: 7,
      requirement_id: 1,
      name: "Sugar",
      status: "ONGOING",
      offered_ctc: 30000000,
      discovered_on: "2022-02-06",
      discovered_by: "Ramesh",
    },
  ]);

  const cmpny_cand_map = {}; // This stores company candidates mapping count

  // Also found in Chart.js utils
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const filterCandidates = (year) => {
    const monthlyMapping = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    };
    const reqCandPerMonthMapping = {};
    candidates.forEach((candidate) => {
      const curYear = new Date(candidate.discovered_on).getFullYear();
      const curMonth = new Date(candidate.discovered_on).getMonth() + 1;
      if (curYear == year) {
        if (reqCandPerMonthMapping[candidate.requirement_id])
          reqCandPerMonthMapping[candidate.requirement_id][curMonth] =
            reqCandPerMonthMapping[candidate.requirement_id][curMonth] + 1;
        else {
          reqCandPerMonthMapping[candidate.requirement_id] = Object.assign(
            {},
            monthlyMapping
          );
          reqCandPerMonthMapping[candidate.requirement_id][curMonth] =
            reqCandPerMonthMapping[candidate.requirement_id][curMonth] + 1;
        }
      }
    });
    return requirements.map((requirement) => {
      const color = colors.pop();
      return {
        backgroundColor: color,
        borderColor: color,
        data: Object.values(reqCandPerMonthMapping[requirement.id] ?? 0),
        label: requirement.client_name,
      };
    });
  };

  const reqConfig = {
    type: "bar",
    data: {
      labels: requirements.map(({ client_name }) => client_name),
      datasets: [
        {
          backgroundColor: "#276957",
          borderColor: "#276957",
          data: requirements.map(({ positions }) => positions),
          label: "Total Open Positions",
        },
        {
          backgroundColor: "#42d7ad",
          borderColor: "#42d7ad",
          data: Object.values(
            candidates.map((cand) => {
              if (cmpny_cand_map[cand.requirement_id])
                cmpny_cand_map[cand.requirement_id]++;
              else cmpny_cand_map[cand.requirement_id] = 1;
              return cmpny_cand_map;
            })[0]
          ),
          label: "Candidates Found",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Candidates Positions",
        },
      },
    },
  };

  const candConfig = {
    type: "line",
    data: {
      labels: labels,
      datasets: filterCandidates(2022), // change month here
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Candidates found per month in 2022",
        },
      },
    },
  };

  function setcandidates() {
    // Generating Actual Chart
    reqChartRef = new Chart(document.getElementById("reqChart"), reqConfig);
    candChartRef = new Chart(document.getElementById("candChart"), candConfig);
  }
  setcandidates(); // renders as soon as the component loads

  return (
    <>
      <div className="table-content">
        <h4 className="p-3">Total Candidates list</h4>
        <table className="table table-striped table-hover">
          <thead className="table-header">
            <tr>
              <th>S no</th>
              <th>Name</th>
              <th>Recruiting for</th>
              <th>Status</th>
              <th>Discovered on</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => {
              return (
                <tr key={candidate.id}>
                  <td>{candidate.id}</td>
                  <td>{candidate.name}</td>
                  <td>
                    {requirements.map((req) => {
                      if (req.id == candidate.requirement_id)
                        return req.client_name;
                    })}
                  </td>
                  <td>{candidate.status}</td>
                  <td>{candidate.discovered_on}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("chartTable")).render(
  <ChartTable />
);
