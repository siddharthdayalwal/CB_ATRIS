import React, { Component } from "react";
import { EuiTreeView } from "@elastic/eui";
import { EuiIcon } from "@elastic/eui";
import CheckboxTree from "react-checkbox-tree";
import "./TreeSelect.css";

// const ApiResEnt = {
//   PERSON: ["Sebastian Thrun", "Thrun"],
//   NORP: ["American"],
//   ORG: ["Recode"],
//   DATE: ["2007", "this week"]
// };


// // make sure its tag not label in api res
// const ApiResEntRange = [
//   { start: 0, end: 15, label: "PERSON" },
//   { start: 84, end: 88, label: "DATE" },
//   { start: 196, end: 204, label: "NORP" },
//   { start: 16, end: 21, label: "PERSON" },
//   { start: 344, end: 350, label: "ORG" },
//   { start: 365, end: 374, label: "DATE" }
// ];

const ApiResEnt = {
    PERSON: ["Sebastian Thrun", "Thrun"],
  
    DATE: ["2007"]
  };
  
  // IMPORTANT: make sure its tag not label in api res
  const ApiResEntRange = [
    {
      start: 5,
      end: 20,
      tag: "PERSON"
    },
    { start: 15, end: 20, tag: "PERSON" },
    { start: 71, end: 75, tag: "DATE" }
  ];

const modifiedRes = [
  {
    start: 5,
    end: 20,
    text: "Sebastian Thrun",
    tag: "PERSON",
    color: "#84d2ff"
  },
  {
    start: 15,
    end: 20,
    text: "Thrun",
    tag: "PERSON",
    color: "#84d2ff"
  },
  {
    start: 454,
    end: 462,
    text: "startups",
    tag: "NORP",
    color: "#8111ff"
  },
  {
    start: 507,
    end: 519,
    text: "world clamor",
    tag: "ORG",
    color: "#8112ff"
  }
];

let nodes = [
  {
    value: "/ENTITIES",
    label: "ENTITIES",
    children: [
      {
        value: "/ENTITIES/PERSON",
        label: "PERSON",
        children: [
          {
            value: "/ENTITIES/PERSON/Sebastian Thrun",
            label: "Sebastian Thrun",
            title: "custome titile test"
          },
          {
            value: "/ENTITIES/PERSON/Thrun",
            label: "Thrun"
          }
        ]
      },
      {
        value: "/ENTITIES/NORP",
        label: "NORP",
        children: [
          {
            value: "/ENTITIES/NORP/American",
            label: "American"
          }
        ]
      }
    ]
  }
];

export default class TreeSelect extends Component {
  state = {
    // checked: [],
    // expanded: ["/ENTITIES"],
    // tree_node: []
  };

  constructor(props) {
    super(props);
  }

  reportThis = this.props.getReportPageThis()

  onCheck = (checked, nodeInfo) => {
    // this.setState({ checked });
    this.reportThis.setState({ checked });
    console.log(nodeInfo, "nodeInfo, node");
    // checked.forEach(check_elem => {
    //   let elem_val = checked;
    //   console.log(elem_val);
    // });
    let check_elem_label = nodeInfo.label;
    let isLeaf = nodeInfo.isLeaf;

    if (isLeaf) {
      //process from parent
      let nodeInfoRes = {
        label: "Sebastian Thrun",
        value: "/ENTITIES/PERSON/Sebastian Thrun",
        parent: {
          value: "/ENTITIES/PERSON",
          label: "PERSON",
          children: [
            {
              value: "/ENTITIES/PERSON/Sebastian Thrun",
              label: "Sebastian Thrun",
              title: "custome titile test"
            },
            {
              value: "/ENTITIES/PERSON/Thrun",
              label: "Thrun"
            }
          ]
        },
        isChild: true,
        isParent: false,
        isLeaf: true,
        showCheckbox: true,
        disabled: false,
        treeDepth: 2,
        index: 0,
        checked: true,
        expanded: false,
        checkState: 0
      };
      let check_elem_value = nodeInfo.value;
      let parentLabel = nodeInfo.parent.label;
      let nodeChildren = nodeInfo.parent.children;
      let check_elem_index = -1;
      nodeChildren.forEach((elem, index) => {
        if (elem.label === check_elem_label) {
          check_elem_index = index;
        }
      });
      console.log(check_elem_index, "check_elem_index");

      let reqRangeRes = ApiResEntRange.filter(function(el) {
        return el.tag === parentLabel; //label to tag at el
      });
      console.log(reqRangeRes, "reqRangeRes");
      let checked_range = reqRangeRes[check_elem_index];
      console.log(checked_range, "check range");

      // now decide should remove or add to the annoteState
      let add_remove_annote_state = checked.includes(check_elem_value);

      let { setAnnotateValue, annotateValue } = this.props;

      if (add_remove_annote_state) {
        // add to annote state
        setAnnotateValue([...annotateValue, checked_range]);
      } else {
        // remove from annote state
        let newVal = annotateValue.filter(item => item !== checked_range);
        setAnnotateValue(newVal);
      }
    } else {
      //process by children

      let nodeInfoRes = {
        "label": "PERSON",
        "value": "/ENTITIES/PERSON",
        "children": [
          {
            "value": "/ENTITIES/PERSON/Sebastian Thrun",
            "label": "Sebastian Thrun"
          },
          {
            "value": "/ENTITIES/PERSON/Thrun",
            "label": "Thrun"
          }
        ],
        "parent": {
          "value": "/ENTITIES",
          "label": "ENTITIES",
          "children": [
            {
              "value": "/ENTITIES/PERSON",
              "label": "PERSON",
              "children": [
                {
                  "value": "/ENTITIES/PERSON/Sebastian Thrun",
                  "label": "Sebastian Thrun"
                },
                {
                  "value": "/ENTITIES/PERSON/Thrun",
                  "label": "Thrun"
                }
              ]
            },
            {
              "value": "/ENTITIES/NORP",
              "label": "NORP",
              "children": [
                {
                  "value": "/ENTITIES/NORP/American",
                  "label": "American"
                }
              ]
            },
            {
              "value": "/ENTITIES/ORG",
              "label": "ORG",
              "children": [
                {
                  "value": "/ENTITIES/ORG/Recode",
                  "label": "Recode"
                }
              ]
            },
            {
              "value": "/ENTITIES/DATE",
              "label": "DATE",
              "children": [
                {
                  "value": "/ENTITIES/DATE/2007",
                  "label": "2007"
                },
                {
                  "value": "/ENTITIES/DATE/this week",
                  "label": "this week"
                }
              ]
            }
          ]
        },
        "isChild": true,
        "isParent": true,
        "isLeaf": false,
        "showCheckbox": true,
        "disabled": false,
        "treeDepth": 1,
        "index": 0,
        "checked": true,
        "expanded": false,
        "checkState": 0
      }

      let nodeChildren= nodeInfo.children
      let label = nodeInfo.label

      let reqRangeRes = ApiResEntRange.filter(function(el) {
        return el.tag === label;
      });

      let add_remove_annote_state = nodeChildren.join(",").indexOf( checked.join( "," ) ) == -1
    
      console.log(add_remove_annote_state, "bba")

      let { setAnnotateValue, annotateValue } = this.props;

      //removeing duplicates from state and adding values
      let noDuplicates = reqRangeRes.filter((elem) =>{
        return   !annotateValue.includes(elem)
    })

      if (add_remove_annote_state) {
        // add to annote state
        setAnnotateValue([...annotateValue, ...noDuplicates]);
      } else {
        // remove from annote state
         let newVal = reqRangeRes.filter((elem) =>{
            return   !annotateValue.includes(elem)
        })
        setAnnotateValue(newVal);
      }
    
    }

    console.log(checked);
  };

  onExpand = expanded => {
    this.reportThis.setState({ expanded });
  };

  componentDidMount = () => {
    let entities_node_children = [];

    let new_node = [
      {
        value: "/ENTITIES",
        label: "ENTITIES",
        children: entities_node_children
      }
    ];
    let entities_childrens = [];
    Object.keys(ApiResEnt).forEach(function(entity) {
      // entity is PERSON NORP ORG DATE
      let entity_array = ApiResEnt[entity]; // ["Sebastian Thrun", "Thrun"]
      let entity_children_array = [];
      let entity_obj = {
        value: `/ENTITIES/${entity}`,
        label: entity,
        children: entity_children_array
      };
      entity_array.forEach(entity_values => {
        // entity_values is "Sebastian Thrun", "Thrun" per iteration

        let child_obj = {
          value: `/ENTITIES/${entity}/${entity_values}`,
          label: entity_values
        };
        entity_children_array.push(child_obj);
      });
      entities_node_children.push(entity_obj);
    });

    this.reportThis.setState({
      tree_node: entities_node_children
    });
  };

  render() {
    const { checked, expanded, tree_node } = this.reportThis.state;

    return (
      <CheckboxTree
        checked={checked}
        expanded={expanded}
        iconsClass="fa5"
        nodes={tree_node}
        onCheck={this.onCheck}
        onExpand={this.onExpand}
        showNodeIcon={false}
        expandOnClick={true}
       
        onClick={() => {
          console.log("click");
        }}
      />
    );
  }
}
