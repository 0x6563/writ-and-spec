// Generated automatically by Grammar-Well, version 2.3.1 
// https://github.com/0x6563/grammar-well



class grammar {
    state = {};
    artifacts = {
        grammar: {
            rules: {
                Accessor: [
                    { name: "Accessor", postprocess: ({data}) => { return {type: "expression", kind: "accessor", data: { inputs: [], root: data[0], path: data[1] }}; }, symbols: [ "Group", "Path_Segment_List" ] },
                    { name: "Accessor", postprocess: ({data}) => { return {type: "expression", kind: "accessor", data: { inputs: [], root: data[0], path: data[1] }}; }, symbols: [ "CSS_Selector", "Path_Segment_List" ] },
                    { name: "Accessor", postprocess: ({data}) => { return {type: "expression", kind: "accessor", data: { inputs: [], root: data[0], path: data[1] }}; }, symbols: [ "FunctionCall", "Path_Segment_List" ] },
                    { name: "Accessor", postprocess: ({data}) => { return {type: "expression", kind: "accessor", data: { inputs: [], root: { type: "expression", kind: "reference", data: { inputs: [], name: data[0] } }, path: data[1] }}; }, symbols: [ "Word", "Path_Segment_List" ] },
                    { name: "Accessor", postprocess: ({data}) => { return {type: "expression", kind: "reference", data: { inputs: [], name: data[0] }}; }, symbols: [ "Word" ] }
                ],
                Action: [
                    { name: "Action", postprocess: ({data}) => { return (data[0]); }, symbols: [ "BareAction" ] },
                    { name: "Action", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionFind" ] },
                    { name: "Action", postprocess: ({data}) => { return {type: "statement-expression", kind: "dom-subject", data: { subjects: data[2], block: { type: "block", data: { statements: [data[0]], hoisted: [] } } }}; }, symbols: [ "BareAction", "_", "InChain" ] }
                ],
                ActionClick: [
                    { name: "ActionClick", postprocess: ({data}) => { return {type: "action", kind: "click", data: { button: data[0]?.[0] || "right", behavior: data[4]?.[1], target: data[3] }}; }, symbols: [ "ActionClick.RPT01x1", { literal: "click" }, "__", "Expression", "ActionClick.RPT01x2" ] }
                ],
                "ActionClick.RPT01x1": [
                    { name: "ActionClick.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionClick.RPT01x1.SUBx1" ] },
                    { name: "ActionClick.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionClick.RPT01x1.SUBx1": [
                    { name: "ActionClick.RPT01x1.SUBx1", symbols: [ "ClickType", "__" ] }
                ],
                "ActionClick.RPT01x2": [
                    { name: "ActionClick.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "ActionClick.RPT01x2.SUBx1" ] },
                    { name: "ActionClick.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "ActionClick.RPT01x2.SUBx1": [
                    { name: "ActionClick.RPT01x2.SUBx1", symbols: [ "__", "Word" ] }
                ],
                ActionClose: [
                    { name: "ActionClose", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2][0].value }}; }, symbols: [ { literal: "close" }, "__", "ActionClose.SUBx1" ] }
                ],
                "ActionClose.SUBx1": [
                    { name: "ActionClose.SUBx1", symbols: [ { literal: "tab" } ] },
                    { name: "ActionClose.SUBx1", symbols: [ { literal: "popup" } ] }
                ],
                ActionDrag: [
                    { name: "ActionDrag", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { behavior: data[3]?.[1], source: data[2], destination: data[7] }}; }, symbols: [ { literal: "drag" }, "__", "Expression", "ActionDrag.RPT01x1", "__", { literal: "to" }, "__", "Expression" ] }
                ],
                "ActionDrag.RPT01x1": [
                    { name: "ActionDrag.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionDrag.RPT01x1.SUBx1" ] },
                    { name: "ActionDrag.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionDrag.RPT01x1.SUBx1": [
                    { name: "ActionDrag.RPT01x1.SUBx1", symbols: [ "__", "Word" ] }
                ],
                ActionFind: [
                    { name: "ActionFind", postprocess: ({data}) => { return {type: "action", kind: "find", data: { every: !!data[1], target: data[3] }}; }, symbols: [ { literal: "find" }, "ActionFind.RPT01x1", "__", "Expression" ] },
                    { name: "ActionFind", postprocess: ({data}) => { return {type: "statement-expression", kind: "dom-subject", data: { subjects: data[5], block: { type: "block", data: { statements: [{ type: "action", kind: "find", data: { every: !!data[1], target: data[3] } }], hoisted: [] } } }}; }, symbols: [ { literal: "find" }, "ActionFind.RPT01x2", "__", "Expression", "_", "InChain" ] }
                ],
                "ActionFind.RPT01x1": [
                    { name: "ActionFind.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionFind.RPT01x1.SUBx1" ] },
                    { name: "ActionFind.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionFind.RPT01x1.SUBx1": [
                    { name: "ActionFind.RPT01x1.SUBx1", symbols: [ "__", { literal: "every" } ] }
                ],
                "ActionFind.RPT01x2": [
                    { name: "ActionFind.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "ActionFind.RPT01x2.SUBx1" ] },
                    { name: "ActionFind.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "ActionFind.RPT01x2.SUBx1": [
                    { name: "ActionFind.RPT01x2.SUBx1", symbols: [ "__", { literal: "every" } ] }
                ],
                ActionHover: [
                    { name: "ActionHover", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { behavior: data[3]?.[1], target: data[2] }}; }, symbols: [ { literal: "hover" }, "__", "Expression", "ActionHover.RPT01x1" ] }
                ],
                "ActionHover.RPT01x1": [
                    { name: "ActionHover.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionHover.RPT01x1.SUBx1" ] },
                    { name: "ActionHover.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionHover.RPT01x1.SUBx1": [
                    { name: "ActionHover.RPT01x1.SUBx1", symbols: [ "__", "Word" ] }
                ],
                ActionNavigate: [
                    { name: "ActionNavigate", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { destination: data[4] }}; }, symbols: [ { literal: "navigate" }, "__", { literal: "to" }, "__", "Expression" ] },
                    { name: "ActionNavigate", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { direction: data[2] }}; }, symbols: [ { literal: "navigate" }, "__", "NavigationDirection" ] }
                ],
                ActionResize: [
                    { name: "ActionResize", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { width: data[6], height: data[8] }}; }, symbols: [ { literal: "resize" }, "__", { literal: "tab" }, "__", { literal: "to" }, "__", "Expression", "__", "Expression" ] }
                ],
                ActionScroll: [
                    { name: "ActionScroll", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { behavior: data[2]?.[0], target: data[5] }}; }, symbols: [ { literal: "scroll" }, "__", "ActionScroll.RPT01x1", { literal: "to" }, "__", "ScrollTarget" ] }
                ],
                "ActionScroll.RPT01x1": [
                    { name: "ActionScroll.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionScroll.RPT01x1.SUBx1" ] },
                    { name: "ActionScroll.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionScroll.RPT01x1.SUBx1": [
                    { name: "ActionScroll.RPT01x1.SUBx1", symbols: [ "Word", "__" ] }
                ],
                ActionSimple: [
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "clear" }, "__", "Expression" ] },
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "press" }, "__", "Expression" ] },
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "focus" }, "__", "Expression" ] },
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "blur" }, "__", "Expression" ] },
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "unfocus" }, "__", "Expression" ] },
                    { name: "ActionSimple", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { target: data[2] }}; }, symbols: [ { literal: "restart" }, "__", "Expression" ] }
                ],
                ActionType: [
                    { name: "ActionType", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { behavior: data[3]?.[1], target: data[7], content: data[2] }}; }, symbols: [ { literal: "type" }, "__", "Expression", "ActionType.RPT01x1", "__", { literal: "in" }, "__", "Expression" ] }
                ],
                "ActionType.RPT01x1": [
                    { name: "ActionType.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "ActionType.RPT01x1.SUBx1" ] },
                    { name: "ActionType.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "ActionType.RPT01x1.SUBx1": [
                    { name: "ActionType.RPT01x1.SUBx1", symbols: [ "__", "Word" ] }
                ],
                ActionUpload: [
                    { name: "ActionUpload", postprocess: ({data}) => { return {type: "action", kind: data[0].value, data: { file: data[2], target: data[6] }}; }, symbols: [ { literal: "upload" }, "__", "Expression", "__", { literal: "to" }, "__", "Expression" ] }
                ],
                Array: [
                    { name: "Array", postprocess: ({data}) => { return {type: "expression", kind: "array", data: { inputs: [] }}; }, symbols: [ { literal: "[" }, "_", { literal: "]" } ] },
                    { name: "Array", postprocess: ({data}) => { return {type: "expression", kind: "array", data: { inputs: data[2] }}; }, symbols: [ { literal: "[" }, "_", "Exps", "_", { literal: "]" } ] }
                ],
                Assignable: [
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Expression" ] },
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Capture" ] },
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "EventListener" ] },
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "StatementRun" ] },
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "StatementLoad" ] },
                    { name: "Assignable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionFind" ] },
                    { name: "Assignable", postprocess: ({data}) => { return {type: "event-listener", kind: "next", data: { event: data[2] }}; }, symbols: [ { literal: "next" }, "__", "EventListenerTarget" ] }
                ],
                Assignment: [
                    { name: "Assignment", postprocess: ({data}) => { return {type: "statement", kind: "assignment", data: { target: data[0], value: data[4] }}; }, symbols: [ "Accessor", "_", { literal: "=" }, "_", "Assignable" ] }
                ],
                BareAction: [
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionSimple" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionNavigate" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionClick" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionType" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionHover" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionDrag" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionScroll" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionClose" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionResize" ] },
                    { name: "BareAction", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ActionUpload" ] }
                ],
                Block: [
                    { name: "Block", postprocess: ({data}) => { return ({ type: "block", data: data[2] }); }, symbols: [ { literal: "{" }, "_", "Statements", "_", { literal: "}" } ] },
                    { name: "Block", postprocess: ({data}) => { return ({ type: "block", data: { statements: [], hoisted: [] } }); }, symbols: [ { literal: "{" }, "_", { literal: "}" } ] }
                ],
                CSS_Selector: [
                    { name: "CSS_Selector", postprocess: ({data}) => { return {type: "literal", kind: "css-selector", data: { value: data[1].map(v => v.value).join('') }}; }, symbols: [ { literal: "$(" }, "CSS_Selector.RPT1Nx1", { literal: ")" } ] }
                ],
                "CSS_Selector.RPT1Nx1": [
                    { name: "CSS_Selector.RPT1Nx1", symbols: [ { token: "T_SELECTOR" } ] },
                    { name: "CSS_Selector.RPT1Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "CSS_Selector.RPT1Nx1", { token: "T_SELECTOR" } ] }
                ],
                Can: [
                    { name: "Can", postprocess: ({data}) => { return ("can"); }, symbols: [ { literal: "can" } ] },
                    { name: "Can", postprocess: ({data}) => { return ("cant"); }, symbols: [ { literal: "cant" } ] },
                    { name: "Can", postprocess: ({data}) => { return ("cant"); }, symbols: [ { literal: "can't" } ] }
                ],
                Capture: [
                    { name: "Capture", postprocess: ({data}) => { return {type: "statement-expression", kind: "browser-event-capture", data: { type: data[0].value, block: { type: "block", data: { statements: [data[4]], hoisted: [] } } }}; }, symbols: [ { literal: "tab" }, "__", { literal: "from" }, "__", "Action" ] },
                    { name: "Capture", postprocess: ({data}) => { return {type: "statement-expression", kind: "browser-event-capture", data: { type: data[0].value, block: { type: "block", data: { statements: [data[4]], hoisted: [] } } }}; }, symbols: [ { literal: "popup" }, "__", { literal: "from" }, "__", "Action" ] },
                    { name: "Capture", postprocess: ({data}) => { return {type: "statement-expression", kind: "browser-event-capture", data: { type: data[0].value, block: { type: "block", data: { statements: [data[4]], hoisted: [] } } }}; }, symbols: [ { literal: "download" }, "__", { literal: "from" }, "__", "Action" ] }
                ],
                Channel: [
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "tab" } ] },
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "popup" } ] },
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "dialog" } ] },
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "download" } ] },
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "network" } ] },
                    { name: "Channel", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "navigation" } ] }
                ],
                ClickType: [
                    { name: "ClickType", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "left" } ] },
                    { name: "ClickType", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "right" } ] },
                    { name: "ClickType", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "middle" } ] },
                    { name: "ClickType", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "double" } ] }
                ],
                Comment: [
                    { name: "Comment", postprocess: ({data}) => { return {type: "comment", kind: "block", data: { comment: data[1].map(t => t[0].value).join('') }}; }, symbols: [ { token: "comment_open" }, "Comment.RPT1Nx1", { token: "comment_close" } ] },
                    { name: "Comment", postprocess: ({data}) => { return {type: "comment", kind: "inline", data: { comment: data[1].value }}; }, symbols: [ { token: "comment_marker" }, { token: "comment" } ] }
                ],
                "Comment.RPT1Nx1": [
                    { name: "Comment.RPT1Nx1", symbols: [ "Comment.RPT1Nx1.SUBx1" ] },
                    { name: "Comment.RPT1Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "Comment.RPT1Nx1", "Comment.RPT1Nx1.SUBx2" ] }
                ],
                "Comment.RPT1Nx1.SUBx1": [
                    { name: "Comment.RPT1Nx1.SUBx1", symbols: [ { token: "comment" }, "_" ] }
                ],
                "Comment.RPT1Nx1.SUBx2": [
                    { name: "Comment.RPT1Nx1.SUBx2", symbols: [ { token: "comment" }, "_" ] }
                ],
                Condition: [
                    { name: "Condition", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Expression" ] },
                    { name: "Condition", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Verify" ] },
                    { name: "Condition", postprocess: ({data}) => { return ({ ...data[2], kind: data[0] }); }, symbols: [ "Can", "__", "Verify" ] }
                ],
                Constant: [
                    { name: "Constant", postprocess: ({data}) => { return (null); }, symbols: [ { literal: "null" } ] },
                    { name: "Constant", postprocess: ({data}) => { return (false); }, symbols: [ { literal: "false" } ] },
                    { name: "Constant", postprocess: ({data}) => { return (true); }, symbols: [ { literal: "true" } ] }
                ],
                Define: [
                    { name: "Define", postprocess: ({data}) => { return {...data[5], data: { ...data[5].data, browser: !!data[2], behavior: !!data[3] }}; }, symbols: [ { literal: "define" }, "__", "Define.RPT01x1", "Define.RPT01x2", "_", "Function" ] },
                    { name: "Define", postprocess: ({data}) => { return {type: "define", kind: "behavior", hoisted: true, data: { name: data[4], value: data[8] }}; }, symbols: [ { literal: "define" }, "__", { literal: "behavior" }, "__", "Word", "_", { literal: "=" }, "_", "Object" ] }
                ],
                "Define.RPT01x1": [
                    { name: "Define.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "Define.RPT01x1.SUBx1" ] },
                    { name: "Define.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "Define.RPT01x1.SUBx1": [
                    { name: "Define.RPT01x1.SUBx1", symbols: [ { literal: "browser" }, "__" ] }
                ],
                "Define.RPT01x2": [
                    { name: "Define.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "Define.RPT01x2.SUBx1" ] },
                    { name: "Define.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "Define.RPT01x2.SUBx1": [
                    { name: "Define.RPT01x2.SUBx1", symbols: [ { literal: "behavior" }, "__" ] }
                ],
                Dimension: [
                    { name: "Dimension", postprocess: ({data}) => { return {type: "expression", kind: "dimension", data: { inputs: [], value: data[0], unit: data[2] }}; }, symbols: [ "Number", "_", "DimensionUnit" ] }
                ],
                DimensionUnit: [
                    { name: "DimensionUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "px" } ] }
                ],
                Duration: [
                    { name: "Duration", postprocess: ({data}) => { return {type: "expression", kind: "duration", data: { inputs: [], value: data[0], unit: data[2] }}; }, symbols: [ "Number", "_", "TimeUnit" ] }
                ],
                DurationList: [
                    { name: "DurationList", postprocess: ({data}) => { return {type: "expression", kind: "duration-list", data: { inputs: [...data[0].data.inputs, data[2]] }}; }, symbols: [ "DurationList", "_", "Duration" ] },
                    { name: "DurationList", postprocess: ({data}) => { return {type: "expression", kind: "duration-list", data: { inputs: [data[0]] }}; }, symbols: [ "Duration" ] }
                ],
                EventListener: [
                    { name: "EventListener", postprocess: ({data}) => { return {type: "event-listener", kind: data[0].value, hoisted: true, data: { event: data[3], block: data[4], timing: data[1]?.[1] ?? "every" }}; }, symbols: [ { literal: "before" }, "EventListener.RPT01x1", "__", "EventListenerTarget", "RunBlock" ] },
                    { name: "EventListener", postprocess: ({data}) => { return {type: "event-listener", kind: data[0].value, hoisted: true, data: { event: data[3], block: data[4], timing: data[1]?.[1] ?? "every" }}; }, symbols: [ { literal: "after" }, "EventListener.RPT01x2", "__", "EventListenerTarget", "RunBlock" ] }
                ],
                "EventListener.RPT01x1": [
                    { name: "EventListener.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "EventListener.RPT01x1.SUBx1" ] },
                    { name: "EventListener.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "EventListener.RPT01x1.SUBx1": [
                    { name: "EventListener.RPT01x1.SUBx1", symbols: [ "__", "ListenerQualifier" ] }
                ],
                "EventListener.RPT01x2": [
                    { name: "EventListener.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "EventListener.RPT01x2.SUBx1" ] },
                    { name: "EventListener.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "EventListener.RPT01x2.SUBx1": [
                    { name: "EventListener.RPT01x2.SUBx1", symbols: [ "__", "ListenerQualifier" ] }
                ],
                EventListenerTarget: [
                    { name: "EventListenerTarget", postprocess: ({data}) => { return {type: "event", data: { channel: data[0], event: data[2] }}; }, symbols: [ "Channel", "__", "Word" ] },
                    { name: "EventListenerTarget", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Expression" ] }
                ],
                Exp: [
                    { name: "Exp", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L1" ] }
                ],
                ExpList: [
                    { name: "ExpList", postprocess: ({data}) => { return [data[0]]; }, symbols: [ "Exp" ] },
                    { name: "ExpList", postprocess: ({data}) => { return [...data[0], data[4]]; }, symbols: [ "ExpList", "_", { literal: "," }, "_", "Exp" ] }
                ],
                Exp_L1: [
                    { name: "Exp_L1", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L2" ] },
                    { name: "Exp_L1", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L1", "_", { literal: "or" }, "_", "Exp_L2" ] }
                ],
                Exp_L2: [
                    { name: "Exp_L2", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L3" ] },
                    { name: "Exp_L2", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L2", "_", { literal: "and" }, "_", "Exp_L3" ] }
                ],
                Exp_L3: [
                    { name: "Exp_L3", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: "<" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: ">" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: "<=" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: ">=" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: "!=" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L3", "_", { literal: "==" }, "_", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "is" }, "__", "Word" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: "isnt", data: { inputs: [data[0]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "isnt" }, "__", "Word" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: "isnt", data: { inputs: [data[0]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "isn't" }, "__", "Word" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[6]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "has" }, "__", "Word", "__", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: "hasnt", data: { inputs: [data[0], data[6]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "hasnt" }, "__", "Word", "__", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: "hasnt", data: { inputs: [data[0], data[6]], function: data[4] }}; }, symbols: [ "Exp_L3", "_", { literal: "hasn't" }, "__", "Word", "__", "Exp_L4" ] },
                    { name: "Exp_L3", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4], data[8]] }}; }, symbols: [ "Exp_L3", "_", { literal: "between" }, "_", "Exp", "_", { literal: "to" }, "_", "Exp" ] }
                ],
                Exp_L4: [
                    { name: "Exp_L4", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L5" ] },
                    { name: "Exp_L4", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L4", "_", { literal: ".." }, "_", "Exp_L5" ] }
                ],
                Exp_L5: [
                    { name: "Exp_L5", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L6" ] },
                    { name: "Exp_L5", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L5", "_", { literal: "+" }, "_", "Exp_L6" ] },
                    { name: "Exp_L5", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L5", "_", { literal: "-" }, "_", "Exp_L6" ] }
                ],
                Exp_L6: [
                    { name: "Exp_L6", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L7" ] },
                    { name: "Exp_L6", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L6", "_", { literal: "*" }, "_", "Exp_L7" ] },
                    { name: "Exp_L6", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L6", "_", { literal: "/" }, "_", "Exp_L7" ] },
                    { name: "Exp_L6", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L6", "_", { literal: "%" }, "_", "Exp_L7" ] }
                ],
                Exp_L7: [
                    { name: "Exp_L7", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L8" ] },
                    { name: "Exp_L7", postprocess: ({data}) => { return {type: "expression", kind:"!", data: { inputs: [data[2]] }}; }, symbols: [ { literal: "!" }, "_", "Exp_L8" ] },
                    { name: "Exp_L7", postprocess: ({data}) => { return {type: "expression", kind:"!", data: { inputs: [data[2]] }}; }, symbols: [ { literal: "not" }, "_", "Exp_L8" ] }
                ],
                Exp_L8: [
                    { name: "Exp_L8", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp_L9" ] },
                    { name: "Exp_L8", postprocess: ({data}) => { return {type: "expression", kind: data[2].value, data: { inputs: [data[0], data[4]] }}; }, symbols: [ "Exp_L8", "_", { literal: "^" }, "_", "Exp_L9" ] }
                ],
                Exp_L9: [
                    { name: "Exp_L9", postprocess: ({data}) => { return ({ type: "literal", kind: "number", data: { value: data[0] } }); }, symbols: [ "Number" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return ({ type: "literal", kind: "number", data: { value: data[0] } }); }, symbols: [ "NegativeNumber" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return ({ type: "literal", kind: "string", data: { value: data[0] } }); }, symbols: [ "String" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0] === null ? { type: "literal", kind: "null", data: { value: null } } : { type: "literal", kind: "boolean", data: { value: data[0] } }); }, symbols: [ "Constant" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "CSS_Selector" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Accessor" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Group" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "FunctionCall" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Array" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "LogicalConnector" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "DurationList" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Dimension" ] },
                    { name: "Exp_L9", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Object" ] }
                ],
                Expression: [
                    { name: "Expression", postprocess: ({data}) => { return (data[0]); }, symbols: [ "NewRef" ] },
                    { name: "Expression", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Exp" ] }
                ],
                Exps: [
                    { name: "Exps", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ExpList" ] },
                    { name: "Exps", postprocess: ({data}) => { return (data[0]); }, symbols: [ "ExpList", "_", { literal: "," } ] }
                ],
                FlowControl: [
                    { name: "FlowControl", postprocess: ({data}) => { return {type: "statement", kind: data[0].value, data: { target: data[2]?.value }}; }, symbols: [ { literal: "stop" }, "__", { literal: "suite" } ] },
                    { name: "FlowControl", postprocess: ({data}) => { return {type: "statement", kind: data[0].value, data: { target: data[2]?.value }}; }, symbols: [ { literal: "stop" }, "__", { literal: "app" } ] },
                    { name: "FlowControl", postprocess: ({data}) => { return {type: "statement", kind: data[0].value, data: { target: data[2]?.value }}; }, symbols: [ { literal: "stop" }, "__", { literal: "event" } ] },
                    { name: "FlowControl", postprocess: ({data}) => { return {type: "statement", kind: data[0].value, data: { target: data[2]?.value }}; }, symbols: [ { literal: "stop" } ] },
                    { name: "FlowControl", postprocess: ({data}) => { return {type: "statement", kind: data[0].value, data: { target: data[2]?.value }}; }, symbols: [ { literal: "skip" } ] }
                ],
                Function: [
                    { name: "Function", postprocess: ({data}) => { return {type: "define", kind: "function", hoisted: true, data: { name: data[2], args: data[3], block: data[5] }}; }, symbols: [ { literal: "function" }, "__", "FunctionName", "FunctionArgs", "_", "Block" ] },
                    { name: "Function", postprocess: ({data}) => { return {type: "define", kind: "function", hoisted: true, data: { name: data[2], args: data[3], source: data[5] }}; }, symbols: [ { literal: "js" }, "__", "FunctionName", "FunctionArgs", "_", "JsBlock" ] },
                    { name: "Function", postprocess: ({data}) => { return {type: "define", kind: "function", hoisted: true, data: { name: data[2], args: data[3], source: data[5] }}; }, symbols: [ { literal: "javascript" }, "__", "FunctionName", "FunctionArgs", "_", "JsBlock" ] }
                ],
                FunctionArgs: [
                    { name: "FunctionArgs", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "(" }, "_", "WordList", "_", { literal: ")" } ] },
                    { name: "FunctionArgs", postprocess: ({data}) => { return ([]); }, symbols: [ { literal: "(" }, "_", { literal: ")" } ] }
                ],
                FunctionCall: [
                    { name: "FunctionCall", postprocess: ({data}) => { return {type: "expression", kind: "call", data: { inputs: [data[0], ...data[4]] }}; }, symbols: [ "FunctionCallee", "_", { literal: "(" }, "_", "Exps", "_", { literal: ")" } ] },
                    { name: "FunctionCall", postprocess: ({data}) => { return {type: "expression", kind: "call", data: { inputs: [data[0]] }}; }, symbols: [ "FunctionCallee", "_", { literal: "(" }, "_", { literal: ")" } ] }
                ],
                FunctionCallee: [
                    { name: "FunctionCallee", postprocess: ({data}) => { return {type: "expression", kind: "reference", data: { inputs: [], name: data[0] }}; }, symbols: [ "Word" ] },
                    { name: "FunctionCallee", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Group" ] }
                ],
                FunctionName: [
                    { name: "FunctionName", postprocess: ({data}) => { return {name: data[0]}; }, symbols: [ "Word" ] },
                    { name: "FunctionName", postprocess: ({data}) => { return {name: data[0], namespace: data[2]}; }, symbols: [ "Word", { literal: "." }, "Word" ] }
                ],
                Group: [
                    { name: "Group", postprocess: ({data}) => { return {type: "expression", kind: "group", data: { inputs: [data[2]] }}; }, symbols: [ { literal: "(" }, "_", "Exp", "_", { literal: ")" } ] }
                ],
                If: [
                    { name: "If", postprocess: ({data}) => { return {type: "flow", kind: "if", data: { condition: data[2], block: data[3] }}; }, symbols: [ { literal: "if" }, "__", "Condition", "RunBlock" ] },
                    { name: "If", postprocess: ({data}) => { return {type: "flow", kind: "if", data: { condition: data[2], block: data[3], else: data[6] }}; }, symbols: [ { literal: "if" }, "__", "Condition", "RunBlock", "_", { literal: "else" }, "RunBlock" ] }
                ],
                Import: [
                    { name: "Import", postprocess: ({data}) => { return {type: "import", value: data[2]}; }, symbols: [ { literal: "import" }, "__", "String" ] }
                ],
                Imports: [
                    { name: "Imports", postprocess: ({data}) => { return [data[0]]; }, symbols: [ "Import" ] },
                    { name: "Imports", postprocess: ({data}) => { return [...data[0], data[2]]; }, symbols: [ "Imports", "__", "Import" ] }
                ],
                InChain: [
                    { name: "InChain", postprocess: ({data}) => { return ([data[2]]); }, symbols: [ { literal: "in" }, "__", "Expression" ] },
                    { name: "InChain", postprocess: ({data}) => { return ([...data[0], data[4]]); }, symbols: [ "InChain", "__", { literal: "in" }, "__", "Expression" ] }
                ],
                JsBlock: [
                    { name: "JsBlock", postprocess: ({data}) => { return {type: "source", kind: "javascript", data: { source: data[1].map(v => v.value).join('') }}; }, symbols: [ { literal: "{" }, "JsBlock.RPT1Nx1", { literal: "}" } ] }
                ],
                "JsBlock.RPT1Nx1": [
                    { name: "JsBlock.RPT1Nx1", symbols: [ { token: "T_JSBODY" } ] },
                    { name: "JsBlock.RPT1Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "JsBlock.RPT1Nx1", { token: "T_JSBODY" } ] }
                ],
                ListenerQualifier: [
                    { name: "ListenerQualifier", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "next" } ] },
                    { name: "ListenerQualifier", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "every" } ] }
                ],
                LogicalConnector: [
                    { name: "LogicalConnector", postprocess: ({data}) => { return {type: "expression", kind: data[0][0].value, data: { inputs: [], conditions: data[4] }}; }, symbols: [ "LogicalConnector.SUBx1", "_", { literal: "{" }, "_", "Exps", "_", { literal: "}" } ] }
                ],
                "LogicalConnector.SUBx1": [
                    { name: "LogicalConnector.SUBx1", symbols: [ { literal: "any" } ] },
                    { name: "LogicalConnector.SUBx1", symbols: [ { literal: "all" } ] }
                ],
                Loop: [
                    { name: "Loop", postprocess: ({data}) => { return {type: "flow", kind: "while", data: { condition: data[2], block: data[3] }}; }, symbols: [ { literal: "while" }, "__", "Expression", "RunBlock" ] },
                    { name: "Loop", postprocess: ({data}) => { return {type: "flow", kind: "until", data: { condition: data[2], block: data[3] }}; }, symbols: [ { literal: "until" }, "__", "Expression", "RunBlock" ] },
                    { name: "Loop", postprocess: ({data}) => { return {type: "flow", kind: "for", data: { key: null, value: data[2], iterable: data[6], block: data[7] }}; }, symbols: [ { literal: "for" }, "__", "Word", "__", { literal: "in" }, "__", "Expression", "RunBlock" ] },
                    { name: "Loop", postprocess: ({data}) => { return {type: "flow", kind: "for", data: { key: data[2], value: data[5], iterable: data[9], block: data[10] }}; }, symbols: [ { literal: "for" }, "__", "Word", { literal: "," }, "_", "Word", "__", { literal: "in" }, "__", "Expression", "RunBlock" ] },
                    { name: "Loop", postprocess: ({data}) => { return {type: "flow", kind: "for", data: { key: null, value: data[2], iterable: data[6], block: data[7] }}; }, symbols: [ { literal: "for" }, "__", "Word", "__", { literal: "in" }, "__", "Range", "RunBlock" ] }
                ],
                Must: [
                    { name: "Must", postprocess: ({data}) => { return ("must"); }, symbols: [ { literal: "must" } ] },
                    { name: "Must", postprocess: ({data}) => { return ("mustnt"); }, symbols: [ { literal: "mustnt" } ] },
                    { name: "Must", postprocess: ({data}) => { return ("mustnt"); }, symbols: [ { literal: "mustn't" } ] }
                ],
                NavigationDirection: [
                    { name: "NavigationDirection", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "back" } ] },
                    { name: "NavigationDirection", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "forward" } ] },
                    { name: "NavigationDirection", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "reload" } ] }
                ],
                NegativeNumber: [
                    { name: "NegativeNumber", postprocess: ({data}) => { return (data[2] * -1); }, symbols: [ { literal: "-" }, "_", "Number" ] }
                ],
                NewRef: [
                    { name: "NewRef", postprocess: ({data}) => { return {type: "expression", kind: "new", data: { inputs: [], construct: data[2][0].value }}; }, symbols: [ { literal: "new" }, "__", "NewRef.SUBx1" ] }
                ],
                "NewRef.SUBx1": [
                    { name: "NewRef.SUBx1", symbols: [ { literal: "tab" } ] },
                    { name: "NewRef.SUBx1", symbols: [ { literal: "session" } ] },
                    { name: "NewRef.SUBx1", symbols: [ { literal: "incognito" } ] },
                    { name: "NewRef.SUBx1", symbols: [ { literal: "timer" } ] }
                ],
                Number: [
                    { name: "Number", postprocess: ({data}) => { return (parseFloat(`${data[0].value}.${data[2].value}`)); }, symbols: [ { token: "digits" }, { literal: "." }, { token: "digits" } ] },
                    { name: "Number", postprocess: ({data}) => { return (parseInt(`${data[0].value}`)); }, symbols: [ { token: "digits" } ] }
                ],
                Object: [
                    { name: "Object", postprocess: ({data}) => { return {type: "expression", kind: "object", data: { inputs: [], properties: [] }}; }, symbols: [ { literal: "{" }, "_", { literal: "}" } ] },
                    { name: "Object", postprocess: ({data}) => { return {type: "expression", kind: "object", data: { inputs: [], properties: data[2] }}; }, symbols: [ { literal: "{" }, "_", "Props", "_", { literal: "}" } ] }
                ],
                Path_Segment: [
                    { name: "Path_Segment", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "[" }, "_", "Exp", "_", { literal: "]" } ] },
                    { name: "Path_Segment", postprocess: ({data}) => { return {type: "literal", kind: "string", data: { value: data[2] }}; }, symbols: [ { literal: "." }, "_", "Word" ] },
                    { name: "Path_Segment", postprocess: ({data}) => { return {type: "literal", kind: "string", data: { value: data[2] }}; }, symbols: [ { literal: "'s" }, "__", "Word" ] }
                ],
                Path_Segment_List: [
                    { name: "Path_Segment_List", postprocess: ({data}) => { return [data[0]]; }, symbols: [ "Path_Segment" ] },
                    { name: "Path_Segment_List", postprocess: ({data}) => { return [...data[0], data[2]]; }, symbols: [ "Path_Segment_List", "_", "Path_Segment" ] }
                ],
                Prop: [
                    { name: "Prop", postprocess: ({data}) => { return {type: "property", kind: "value", data: { key: data[0], value: data[4]}}; }, symbols: [ "PropName", "_", { literal: ":" }, "_", "Exp" ] },
                    { name: "Prop", postprocess: ({data}) => { return {type: "property", kind: "spread", data:  data[2]}; }, symbols: [ { literal: "..." }, "_", "Exp" ] },
                    { name: "Prop", postprocess: ({data}) => { return {type: "property", kind: "value", data: { key: data[0], value: { type: "expression", kind: "reference", data: { inputs: [], name: data[0] } } }}; }, symbols: [ "Word" ] }
                ],
                PropList: [
                    { name: "PropList", postprocess: ({data}) => { return [data[0]]; }, symbols: [ "Prop" ] },
                    { name: "PropList", postprocess: ({data}) => { return [...data[0], data[4]]; }, symbols: [ "PropList", "_", { literal: "," }, "_", "Prop" ] }
                ],
                PropName: [
                    { name: "PropName", postprocess: ({data}) => { return (data[0]); }, symbols: [ "String" ] },
                    { name: "PropName", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Word" ] }
                ],
                Props: [
                    { name: "Props", postprocess: ({data}) => { return (data[0]); }, symbols: [ "PropList" ] },
                    { name: "Props", postprocess: ({data}) => { return (data[0]); }, symbols: [ "PropList", "_", { literal: "," } ] }
                ],
                Range: [
                    { name: "Range", postprocess: ({data}) => { return {type: "expression", kind: "range", data: { inputs: [data[2], data[6]] }}; }, symbols: [ { literal: "range" }, "__", "Expression", "__", { literal: "to" }, "__", "Expression" ] },
                    { name: "Range", postprocess: ({data}) => { return {type: "expression", kind: "range", data: { inputs: [data[2], data[9], data[5]] }}; }, symbols: [ { literal: "range" }, "__", "Expression", { literal: "," }, "_", "Step", "__", { literal: "to" }, "__", "Expression" ] }
                ],
                RunBlock: [
                    { name: "RunBlock", postprocess: ({data}) => { return (data[1]); }, symbols: [ "_", "Block" ] },
                    { name: "RunBlock", postprocess: ({data}) => { return ({ type: "block", data: data[1].hoisted ? { statements: [], hoisted: [data[1]] } : { statements: [data[1]], hoisted: [] } }); }, symbols: [ "__", "Statement" ] }
                ],
                Runnable: [
                    { name: "Runnable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "FunctionCall" ] },
                    { name: "Runnable", postprocess: ({data}) => { return {type: "block", data: { environment: data[2].value, source: data[6] }}; }, symbols: [ { literal: "in" }, "__", { literal: "browser" }, "__", { literal: "js" }, "_", "JsBlock" ] },
                    { name: "Runnable", postprocess: ({data}) => { return {type: "block", data: { environment: data[2], source: data[6] }}; }, symbols: [ { literal: "in" }, "__", "Word", "__", { literal: "js" }, "_", "JsBlock" ] },
                    { name: "Runnable", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Block" ] }
                ],
                ScrollTarget: [
                    { name: "ScrollTarget", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Expression" ] },
                    { name: "ScrollTarget", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "top" } ] },
                    { name: "ScrollTarget", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "bottom" } ] },
                    { name: "ScrollTarget", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "left" } ] },
                    { name: "ScrollTarget", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "right" } ] }
                ],
                Start: [
                    { name: "Start", postprocess: ({data}) => { return {type: "script", imports: data[1], block: { type: "block", data: data[3] }}; }, symbols: [ "_", "Imports", "__", "Statements", "_" ] },
                    { name: "Start", postprocess: ({data}) => { return {type: "script", block: { type: "block", data: data[1] }}; }, symbols: [ "_", "Statements", "_" ] }
                ],
                Statement: [
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "TestSuite" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Define" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Assignment" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "If" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Action" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "FlowControl" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Loop" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "EventListener" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "UnhoistedEventListener" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Comment" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "try", data: { block: data[2] }}; }, symbols: [ { literal: "try" }, "_", "Block" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "StatementRun" ] },
                    { name: "Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Verify" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: data[0], data: { statement: data[2] }}; }, symbols: [ "Must", "__", "Verify" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: data[0], data: { statement: data[2] }}; }, symbols: [ "Must", "__", "StatementRun" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: data[0], data: { statement: data[2] }}; }, symbols: [ "Must", "__", "Action" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "wait", data: { duration: data[2] }}; }, symbols: [ { literal: "wait" }, "__", "DurationList" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "wait-until", data: { condition: data[4] }}; }, symbols: [ { literal: "wait" }, "__", { literal: "until" }, "__", "Expression" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "wait-until-next", data: { event: data[6] }}; }, symbols: [ { literal: "wait" }, "__", { literal: "until" }, "__", { literal: "next" }, "__", "EventListenerTarget" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "within", data: { context: data[2], block: data[3] }}; }, symbols: [ { literal: "within" }, "__", "Expression", "RunBlock" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "within-every", data: { context: data[4], block: data[5] }}; }, symbols: [ { literal: "within" }, "__", { literal: "every" }, "__", "Expression", "RunBlock" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "log", data: { expression: data[2] }}; }, symbols: [ { literal: "log" }, "__", "Expression" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "delete", data: { expression: data[2] }}; }, symbols: [ { literal: "delete" }, "__", "Expression" ] },
                    { name: "Statement", postprocess: ({data}) => { return {type: "statement", kind: "dev", data: { call: data[2] }}; }, symbols: [ { literal: "dev" }, "__", "FunctionCall" ] }
                ],
                StatementLoad: [
                    { name: "StatementLoad", postprocess: ({data}) => { return {type: "statement", kind: "load", data: { runnable: data[2] }}; }, symbols: [ { literal: "load" }, "_", "Runnable" ] },
                    { name: "StatementLoad", postprocess: ({data}) => { return {type: "statement", kind: "load", data: { runnable: data[4], global: true }}; }, symbols: [ { literal: "load" }, "__", { literal: "globally" }, "_", "Runnable" ] }
                ],
                StatementRun: [
                    { name: "StatementRun", postprocess: ({data}) => { return {type: "statement", kind: "run", data: { runnable: data[2] }}; }, symbols: [ { literal: "run" }, "_", "Runnable" ] }
                ],
                Statements: [
                    { name: "Statements", postprocess: ({data}) => { return (data[0].hoisted ? { statements: [], hoisted: [data[0]] } : { statements: [data[0]], hoisted: [] }); }, symbols: [ "Statement" ] },
                    { name: "Statements", postprocess: ({data}) => { return (data[2].hoisted
        ? { statements: data[0].statements, hoisted: [...data[0].hoisted, data[2]] }
        : { statements: [...data[0].statements, data[2]], hoisted: data[0].hoisted }); }, symbols: [ "Statements", "__", "Statement" ] }
                ],
                Step: [
                    { name: "Step", postprocess: ({data}) => { return {type: "expression", kind: "step", data: { inputs: [data[1]], direction: "+" }}; }, symbols: [ { literal: "+" }, "Expression" ] },
                    { name: "Step", postprocess: ({data}) => { return {type: "expression", kind: "step", data: { inputs: [data[1]], direction: "-" }}; }, symbols: [ { literal: "-" }, "Expression" ] }
                ],
                String: [
                    { name: "String", postprocess: ({data}) => { return (data[1]); }, symbols: [ { token: "dquote" }, "StringInner", { token: "dquote" } ] },
                    { name: "String", postprocess: ({data}) => { return (""); }, symbols: [ { token: "dquote" }, { token: "dquote" } ] }
                ],
                StringEscape: [
                    { name: "StringEscape", postprocess: ({data}) => { return (JSON.parse(`"${data[0].value}"`)); }, symbols: [ { token: "escaped" } ] },
                    { name: "StringEscape", postprocess: ({data}) => { return ('"'); }, symbols: [ { token: "quoteEscape" } ] }
                ],
                StringInner: [
                    { name: "StringInner", postprocess: ({data}) => { return (data[0] + data[1]); }, symbols: [ "StringInner", "StringEscape" ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0] + data[1].value); }, symbols: [ "StringInner", { token: "string" } ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0]); }, symbols: [ "StringEscape" ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { token: "string" } ] }
                ],
                TestSuite: [
                    { name: "TestSuite", postprocess: ({data}) => { return {type: "test-suite", data: { name: data[4], block: data[6] }}; }, symbols: [ { literal: "test" }, "__", { literal: "suite" }, "__", "String", "_", "Block" ] }
                ],
                TimeUnit: [
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "ms" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "millisecond" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "milliseconds" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "s" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "second" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "seconds" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "m" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "min" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "minute" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "minutes" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "h" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "hr" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "hour" } ] },
                    { name: "TimeUnit", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { literal: "hours" } ] }
                ],
                UnhoistedEventListener: [
                    { name: "UnhoistedEventListener", postprocess: ({data}) => { return {...data[2], hoisted: false}; }, symbols: [ { literal: "now" }, "__", "EventListener" ] }
                ],
                Verify: [
                    { name: "Verify", postprocess: ({data}) => { return {type: "verify", kind: "can", data: { inputs: [data[6]], alias: data[2] }}; }, symbols: [ { literal: "verify" }, "__", "String", "_", { literal: "by" }, "__", "Expression" ] },
                    { name: "Verify", postprocess: ({data}) => { return {type: "verify", kind: "can", data: { inputs: [data[2]] }}; }, symbols: [ { literal: "verify" }, "__", "Expression" ] }
                ],
                Word: [
                    { name: "Word", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { token: "word" } ] }
                ],
                WordList: [
                    { name: "WordList", postprocess: ({data}) => { return [data[0]]; }, symbols: [ "Word" ] },
                    { name: "WordList", postprocess: ({data}) => { return [...data[0], data[4]]; }, symbols: [ "WordList", "_", { literal: "," }, "_", "Word" ] }
                ],
                _: [
                    { name: "_", postprocess: ({data}) => { return (null); }, symbols: [ "_.RPT01x1" ] }
                ],
                "_.RPT01x1": [
                    { name: "_.RPT01x1", postprocess: ({data}) => data[0], symbols: [ { token: "ws" } ] },
                    { name: "_.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                __: [
                    { name: "__", postprocess: ({data}) => { return (null); }, symbols: [ { token: "ws" } ] }
                ]
            },
            start: "Start"
        },
        lexer: {
            start: "start",
            states: {
                brackets: {
                    regex: /(?:(?:((?:\()))|(?:((?:\))))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\]))))/ym,
                    rules: [
                        { highlight: "delimiter", inset: 1, tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lcurly"], when: "{" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rcurly"], when: "}" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lbrack"], when: "[" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rbrack"], when: "]" }
                    ]
                },
                comment_inline: {
                    regex: /(?:(?:(- +note: +)))/ym,
                    rules: [
                        { goto: "comment_inline.span", highlight: "comment", tag: ["comment_marker"], when: /- +note: +/ }
                    ]
                },
                "comment_inline.span": {
                    regex: /(?:(?:([^\n]+)))/ym,
                    rules: [
                        { highlight: "comment", pop: 1, tag: ["comment"], when: /[^\n]+/ }
                    ]
                },
                "comment_inline.start": {
                    regex: /(?:(?:(- +note: +)))/ym,
                    rules: [
                        { goto: "comment_inline.span", highlight: "comment", tag: ["comment_marker"], when: /- +note: +/ }
                    ]
                },
                comment_multline: {
                    regex: /(?:(?:(--- note:\s*)))/ym,
                    rules: [
                        { goto: "comment_multline.span", highlight: "comment", tag: ["comment_open"], when: /--- note:\s*/ }
                    ]
                },
                "comment_multline.span": {
                    regex: /(?:(?:(.+(?=---)))|(?:((?!---).+))|(?:(\n+))|(?:(---)))/ym,
                    rules: [
                        { highlight: "comment", tag: ["comment"], when: /.+(?=---)/ },
                        { highlight: "comment", tag: ["comment"], when: /(?!---).+/ },
                        { highlight: "comment", tag: ["comment"], when: /\n+/ },
                        { highlight: "comment", pop: 1, tag: ["comment_close"], when: /---/ }
                    ]
                },
                "comment_multline.start": {
                    regex: /(?:(?:(--- note:\s*)))/ym,
                    rules: [
                        { goto: "comment_multline.span", highlight: "comment", tag: ["comment_open"], when: /--- note:\s*/ }
                    ]
                },
                "comment_multline.stop": {
                    regex: /(?:(?:(---)))/ym,
                    rules: [
                        { highlight: "comment", pop: 1, tag: ["comment_close"], when: /---/ }
                    ]
                },
                dimension: {
                    regex: /(?:(?:(\d+))|(?:(\s+))|(?:((?:\.)))|(?:(milliseconds(?![_a-zA-Z$\d])))|(?:(millisecond(?![_a-zA-Z$\d])))|(?:(seconds(?![_a-zA-Z$\d])))|(?:(second(?![_a-zA-Z$\d])))|(?:(minutes(?![_a-zA-Z$\d])))|(?:(minute(?![_a-zA-Z$\d])))|(?:(hours(?![_a-zA-Z$\d])))|(?:(hour(?![_a-zA-Z$\d])))|(?:(min(?![_a-zA-Z$\d])))|(?:(hr(?![_a-zA-Z$\d])))|(?:(ms(?![_a-zA-Z$\d])))|(?:(s(?![_a-zA-Z$\d])))|(?:(m(?![_a-zA-Z$\d])))|(?:(h(?![_a-zA-Z$\d])))|(?:(px(?![_a-zA-Z$\d]))))/ym,
                    rules: [
                        { highlight: "number", tag: ["digits"], when: /\d+/ },
                        { tag: ["ws"], when: /\s+/ },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /milliseconds(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /millisecond(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /seconds(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /second(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /minutes(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /minute(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /hours(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /hour(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /min(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /hr(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /ms(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /s(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /m(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /h(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", pop: 1, tag: ["keyword"], when: /px(?![_a-zA-Z$\d])/ }
                    ]
                },
                js_body: {
                    regex: /(?:(?:("(?:\\.|[^"\\\r\n])*"))|(?:('(?:\\.|[^'\\\r\n])*'))|(?:(`(?:\\.|[^`\\])*`))|(?:(\/(?:\\.|[^/\\\r\n])+\/[gmiyu]*))|(?:(\/\/[^\n]*))|(?:(\/\*[\s\S]*?\*\/))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\()))|(?:((?:\))))|(?:((?:\[)))|(?:((?:\]))))/gm,
                    rules: [
                        { tag: ["T_JSBODY"], when: /"(?:\\.|[^"\\\r\n])*"/ },
                        { tag: ["T_JSBODY"], when: /'(?:\\.|[^'\\\r\n])*'/ },
                        { tag: ["T_JSBODY"], when: /`(?:\\.|[^`\\])*`/ },
                        { tag: ["T_JSBODY"], when: /\/(?:\\.|[^/\\\r\n])+\/[gmiyu]*/ },
                        { tag: ["T_JSBODY"], when: /\/\/[^\n]*/ },
                        { tag: ["T_JSBODY"], when: /\/\*[\s\S]*?\*\// },
                        { goto: "js_body", highlight: "annotation", tag: ["T_JSBODY"], when: "{" },
                        { highlight: "annotation", pop: 1, tag: ["T_JSBODY"], when: "}" },
                        { goto: "js_body", highlight: "annotation", tag: ["T_JSBODY"], when: "(" },
                        { highlight: "annotation", pop: 1, tag: ["T_JSBODY"], when: ")" },
                        { goto: "js_body", highlight: "annotation", tag: ["T_JSBODY"], when: "[" },
                        { highlight: "annotation", pop: 1, tag: ["T_JSBODY"], when: "]" }
                    ],
                    unmatched: { tag: ["T_JSBODY"] }
                },
                js_definition: {
                    regex: /(?:(?:((?:\()))|(?:((?:\))))|(?:((?:,)))|(?:((?:\.)))|(?:(\s+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*))|(?:((?:\{))))/ym,
                    rules: [
                        { highlight: "delimiter", tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," },
                        { tag: ["l_dot"], when: "." },
                        { tag: ["ws"], when: /\s+/ },
                        { tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { highlight: "annotation", set: "js_body", when: "{" }
                    ]
                },
                number: {
                    regex: /(?:(?:(\d+)))/ym,
                    rules: [
                        { highlight: "number", tag: ["digits"], when: /\d+/ }
                    ]
                },
                operators: {
                    regex: /(?:(?:((?:!=)))|(?:((?:==)))|(?:((?:>=)))|(?:((?:<=)))|(?:((?:\.\.\.)))|(?:((?:\.\.)))|(?:((?:=)))|(?:((?:>)))|(?:((?:<)))|(?:((?:\+)))|(?:((?:\-)))|(?:((?:\/)))|(?:((?:%)))|(?:((?:\*)))|(?:((?:\^)))|(?:((?:!)))|(?:((?::))))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["l_neq"], when: "!=" },
                        { highlight: "keyword", tag: ["l_eqeq"], when: "==" },
                        { highlight: "keyword", tag: ["l_gteq"], when: ">=" },
                        { highlight: "keyword", tag: ["l_lteq"], when: "<=" },
                        { highlight: "keyword", tag: ["l_spread"], when: "..." },
                        { highlight: "keyword", tag: ["l_concat"], when: ".." },
                        { tag: ["l_eq"], when: "=" },
                        { highlight: "keyword", tag: ["l_gt"], when: ">" },
                        { highlight: "keyword", tag: ["l_lt"], when: "<" },
                        { highlight: "keyword", tag: ["l_add"], when: "+" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-" },
                        { highlight: "keyword", tag: ["l_div"], when: "/" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*" },
                        { highlight: "keyword", tag: ["l_exp"], when: "^" },
                        { highlight: "keyword", tag: ["l_exc"], when: "!" },
                        { highlight: "keyword", tag: ["l_col"], when: ":" }
                    ]
                },
                reserved: {
                    regex: /(?:(?:(import(?![_a-zA-Z$\d])))|(?:(test(?![_a-zA-Z$\d])))|(?:(suite(?![_a-zA-Z$\d])))|(?:(define(?![_a-zA-Z$\d])))|(?:(browser(?![_a-zA-Z$\d])))|(?:(behavior(?![_a-zA-Z$\d])))|(?:(javascript(?![_a-zA-Z$\d])))|(?:(js(?![_a-zA-Z$\d])))|(?:(function(?![_a-zA-Z$\d])))|(?:(run(?![_a-zA-Z$\d])))|(?:(must(?![_a-zA-Z$\d])))|(?:(mustn'?t(?![_a-zA-Z$\d])))|(?:(try(?![_a-zA-Z$\d])))|(?:(load(?![_a-zA-Z$\d])))|(?:(globally(?![_a-zA-Z$\d])))|(?:(now(?![_a-zA-Z$\d])))|(?:(return(?![_a-zA-Z$\d])))|(?:(if(?![_a-zA-Z$\d])))|(?:(else(?![_a-zA-Z$\d])))|(?:(while(?![_a-zA-Z$\d])))|(?:(until(?![_a-zA-Z$\d])))|(?:(for(?![_a-zA-Z$\d])))|(?:(in(?![_a-zA-Z$\d])))|(?:(range(?![_a-zA-Z$\d])))|(?:(to(?![_a-zA-Z$\d])))|(?:(stop(?![_a-zA-Z$\d])))|(?:(app(?![_a-zA-Z$\d])))|(?:(skip(?![_a-zA-Z$\d])))|(?:(before(?![_a-zA-Z$\d])))|(?:(after(?![_a-zA-Z$\d])))|(?:(next(?![_a-zA-Z$\d])))|(?:(every(?![_a-zA-Z$\d])))|(?:(tab(?![_a-zA-Z$\d])))|(?:(popup(?![_a-zA-Z$\d])))|(?:(dialog(?![_a-zA-Z$\d])))|(?:(download(?![_a-zA-Z$\d])))|(?:(network(?![_a-zA-Z$\d])))|(?:(navigation(?![_a-zA-Z$\d])))|(?:(within(?![_a-zA-Z$\d])))|(?:(new(?![_a-zA-Z$\d])))|(?:(from(?![_a-zA-Z$\d])))|(?:(session(?![_a-zA-Z$\d])))|(?:(incognito(?![_a-zA-Z$\d])))|(?:(timer(?![_a-zA-Z$\d])))|(?:(verify(?![_a-zA-Z$\d])))|(?:(can'?t(?![_a-zA-Z$\d])))|(?:(can(?![_a-zA-Z$\d])))|(?:(by(?![_a-zA-Z$\d])))|(?:(wait(?![_a-zA-Z$\d])))|(?:(navigate(?![_a-zA-Z$\d])))|(?:(back(?![_a-zA-Z$\d])))|(?:(forward(?![_a-zA-Z$\d])))|(?:(reload(?![_a-zA-Z$\d])))|(?:(click(?![_a-zA-Z$\d])))|(?:(type(?![_a-zA-Z$\d])))|(?:(hover(?![_a-zA-Z$\d])))|(?:(drag(?![_a-zA-Z$\d])))|(?:(scroll(?![_a-zA-Z$\d])))|(?:(find(?![_a-zA-Z$\d])))|(?:(close(?![_a-zA-Z$\d])))|(?:(resize(?![_a-zA-Z$\d])))|(?:(upload(?![_a-zA-Z$\d])))|(?:(clear(?![_a-zA-Z$\d])))|(?:(press(?![_a-zA-Z$\d])))|(?:(focus(?![_a-zA-Z$\d])))|(?:(blur(?![_a-zA-Z$\d])))|(?:(unfocus(?![_a-zA-Z$\d])))|(?:(restart(?![_a-zA-Z$\d])))|(?:(double(?![_a-zA-Z$\d])))|(?:(middle(?![_a-zA-Z$\d])))|(?:(top(?![_a-zA-Z$\d])))|(?:(bottom(?![_a-zA-Z$\d])))|(?:(left(?![_a-zA-Z$\d])))|(?:(right(?![_a-zA-Z$\d])))|(?:(log(?![_a-zA-Z$\d])))|(?:(delete(?![_a-zA-Z$\d])))|(?:(dev(?![_a-zA-Z$\d])))|(?:(and(?![_a-zA-Z$\d])))|(?:(or(?![_a-zA-Z$\d])))|(?:(not(?![_a-zA-Z$\d])))|(?:(isn'?t(?![_a-zA-Z$\d])))|(?:(is(?![_a-zA-Z$\d])))|(?:(hasn'?t(?![_a-zA-Z$\d])))|(?:(has(?![_a-zA-Z$\d])))|(?:(any(?![_a-zA-Z$\d])))|(?:(all(?![_a-zA-Z$\d])))|(?:(between(?![_a-zA-Z$\d])))|(?:(true(?![_a-zA-Z$\d])))|(?:(false(?![_a-zA-Z$\d])))|(?:(null(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*milliseconds(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*millisecond(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*seconds(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*second(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*minutes(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*minute(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hours(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hour(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*min(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hr(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*ms(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*s(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*m(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*h(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*px(?![_a-zA-Z$\d]))))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["keyword"], when: /import(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /test(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /suite(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /define(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /browser(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /behavior(?![_a-zA-Z$\d])/ },
                        { goto: "js_definition", highlight: "keyword", tag: ["keyword"], when: /javascript(?![_a-zA-Z$\d])/ },
                        { goto: "js_definition", highlight: "keyword", tag: ["keyword"], when: /js(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /must(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /mustn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /try(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /load(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /globally(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /now(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /range(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /stop(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /app(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /skip(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /before(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /after(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /next(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /every(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /tab(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /popup(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /dialog(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /download(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /network(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /navigation(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /within(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /new(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /from(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /session(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /incognito(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /timer(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /verify(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /can'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /can(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /by(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /wait(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /navigate(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /back(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /forward(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /reload(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /click(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /type(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /hover(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /drag(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scroll(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /find(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /close(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /resize(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /upload(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /clear(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /press(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /focus(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /blur(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /unfocus(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /restart(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /double(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /middle(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /top(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /bottom(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /left(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /right(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /log(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /delete(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /dev(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /isn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /is(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /hasn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /has(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /any(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /all(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /between(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*milliseconds(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*millisecond(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*seconds(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*second(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*minutes(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*minute(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hours(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hour(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*min(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hr(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*ms(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*s(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*m(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*h(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*px(?![_a-zA-Z$\d])/ }
                    ]
                },
                reserved_escape: {
                    regex: /(?:(?:((?:\.)))|(?:(\s+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*)))/ym,
                    rules: [
                        { tag: ["l_dot"], when: "." },
                        { tag: ["ws"], when: /\s+/ },
                        { pop: 1, tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ }
                    ]
                },
                selector: {
                    regex: /(?:(?:((?:\$\())))/ym,
                    rules: [
                        { goto: "selector.span", highlight: "keyword", tag: ["selector_open"], when: "$(" }
                    ]
                },
                "selector.span": {
                    regex: /(?:(?:((?:\()))|(?:((?:")))|(?:((?:\)))))/gm,
                    rules: [
                        { goto: "selector_body.span", tag: ["T_SELECTOR"], when: "(" },
                        { goto: "selector_string.span", highlight: "string", tag: ["T_SELECTOR"], when: "\"" },
                        { highlight: "keyword", pop: 1, tag: ["selector_close"], when: ")" }
                    ],
                    unmatched: { tag: ["T_SELECTOR"] }
                },
                "selector.start": {
                    regex: /(?:(?:((?:\$\())))/ym,
                    rules: [
                        { goto: "selector.span", highlight: "keyword", tag: ["selector_open"], when: "$(" }
                    ]
                },
                "selector.stop": {
                    regex: /(?:(?:((?:\)))))/ym,
                    rules: [
                        { highlight: "keyword", pop: 1, tag: ["selector_close"], when: ")" }
                    ]
                },
                selector_body: {
                    regex: /(?:(?:((?:\())))/ym,
                    rules: [
                        { goto: "selector_body.span", tag: ["T_SELECTOR"], when: "(" }
                    ]
                },
                "selector_body.span": {
                    regex: /(?:(?:((?:\()))|(?:((?:")))|(?:((?:\)))))/gm,
                    rules: [
                        { goto: "selector_body", tag: ["T_SELECTOR"], when: "(" },
                        { goto: "selector_string.span", highlight: "string", tag: ["T_SELECTOR"], when: "\"" },
                        { pop: 1, tag: ["T_SELECTOR"], when: ")" }
                    ],
                    unmatched: { tag: ["T_SELECTOR"] }
                },
                "selector_body.start": {
                    regex: /(?:(?:((?:\())))/ym,
                    rules: [
                        { goto: "selector_body.span", tag: ["T_SELECTOR"], when: "(" }
                    ]
                },
                "selector_body.stop": {
                    regex: /(?:(?:((?:\)))))/ym,
                    rules: [
                        { pop: 1, tag: ["T_SELECTOR"], when: ")" }
                    ]
                },
                selector_string: {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { goto: "selector_string.span", highlight: "string", tag: ["T_SELECTOR"], when: "\"" }
                    ]
                },
                "selector_string.span": {
                    regex: /(?:(?:(\\[\\\/bnrft]))|(?:(\\"))|(?:(\\u[A-Fa-f\d]{4}))|(?:(\\.))|(?:([^"\\]+))|(?:((?:"))))/ym,
                    rules: [
                        { highlight: "constant", tag: ["T_SELECTOR"], when: /\\[\\\/bnrft]/ },
                        { tag: ["T_SELECTOR"], when: /\\"/ },
                        { highlight: "constant", tag: ["T_SELECTOR"], when: /\\u[A-Fa-f\d]{4}/ },
                        { tag: ["T_SELECTOR"], when: /\\./ },
                        { highlight: "string", tag: ["T_SELECTOR"], when: /[^"\\]+/ },
                        { highlight: "string", pop: 1, tag: ["T_SELECTOR"], when: "\"" }
                    ]
                },
                "selector_string.start": {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { goto: "selector_string.span", highlight: "string", tag: ["T_SELECTOR"], when: "\"" }
                    ]
                },
                "selector_string.stop": {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { highlight: "string", pop: 1, tag: ["T_SELECTOR"], when: "\"" }
                    ]
                },
                separators: {
                    regex: /(?:(?:((?:'s)))|(?:((?:\.)))|(?:((?:,))))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["l_possessive"], when: "'s" },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," }
                    ]
                },
                start: {
                    regex: /(?:(?:(import(?![_a-zA-Z$\d])))|(?:(test(?![_a-zA-Z$\d])))|(?:(suite(?![_a-zA-Z$\d])))|(?:(define(?![_a-zA-Z$\d])))|(?:(browser(?![_a-zA-Z$\d])))|(?:(behavior(?![_a-zA-Z$\d])))|(?:(javascript(?![_a-zA-Z$\d])))|(?:(js(?![_a-zA-Z$\d])))|(?:(function(?![_a-zA-Z$\d])))|(?:(run(?![_a-zA-Z$\d])))|(?:(must(?![_a-zA-Z$\d])))|(?:(mustn'?t(?![_a-zA-Z$\d])))|(?:(try(?![_a-zA-Z$\d])))|(?:(load(?![_a-zA-Z$\d])))|(?:(globally(?![_a-zA-Z$\d])))|(?:(now(?![_a-zA-Z$\d])))|(?:(return(?![_a-zA-Z$\d])))|(?:(if(?![_a-zA-Z$\d])))|(?:(else(?![_a-zA-Z$\d])))|(?:(while(?![_a-zA-Z$\d])))|(?:(until(?![_a-zA-Z$\d])))|(?:(for(?![_a-zA-Z$\d])))|(?:(in(?![_a-zA-Z$\d])))|(?:(range(?![_a-zA-Z$\d])))|(?:(to(?![_a-zA-Z$\d])))|(?:(stop(?![_a-zA-Z$\d])))|(?:(app(?![_a-zA-Z$\d])))|(?:(skip(?![_a-zA-Z$\d])))|(?:(before(?![_a-zA-Z$\d])))|(?:(after(?![_a-zA-Z$\d])))|(?:(next(?![_a-zA-Z$\d])))|(?:(every(?![_a-zA-Z$\d])))|(?:(tab(?![_a-zA-Z$\d])))|(?:(popup(?![_a-zA-Z$\d])))|(?:(dialog(?![_a-zA-Z$\d])))|(?:(download(?![_a-zA-Z$\d])))|(?:(network(?![_a-zA-Z$\d])))|(?:(navigation(?![_a-zA-Z$\d])))|(?:(within(?![_a-zA-Z$\d])))|(?:(new(?![_a-zA-Z$\d])))|(?:(from(?![_a-zA-Z$\d])))|(?:(session(?![_a-zA-Z$\d])))|(?:(incognito(?![_a-zA-Z$\d])))|(?:(timer(?![_a-zA-Z$\d])))|(?:(verify(?![_a-zA-Z$\d])))|(?:(can'?t(?![_a-zA-Z$\d])))|(?:(can(?![_a-zA-Z$\d])))|(?:(by(?![_a-zA-Z$\d])))|(?:(wait(?![_a-zA-Z$\d])))|(?:(navigate(?![_a-zA-Z$\d])))|(?:(back(?![_a-zA-Z$\d])))|(?:(forward(?![_a-zA-Z$\d])))|(?:(reload(?![_a-zA-Z$\d])))|(?:(click(?![_a-zA-Z$\d])))|(?:(type(?![_a-zA-Z$\d])))|(?:(hover(?![_a-zA-Z$\d])))|(?:(drag(?![_a-zA-Z$\d])))|(?:(scroll(?![_a-zA-Z$\d])))|(?:(find(?![_a-zA-Z$\d])))|(?:(close(?![_a-zA-Z$\d])))|(?:(resize(?![_a-zA-Z$\d])))|(?:(upload(?![_a-zA-Z$\d])))|(?:(clear(?![_a-zA-Z$\d])))|(?:(press(?![_a-zA-Z$\d])))|(?:(focus(?![_a-zA-Z$\d])))|(?:(blur(?![_a-zA-Z$\d])))|(?:(unfocus(?![_a-zA-Z$\d])))|(?:(restart(?![_a-zA-Z$\d])))|(?:(double(?![_a-zA-Z$\d])))|(?:(middle(?![_a-zA-Z$\d])))|(?:(top(?![_a-zA-Z$\d])))|(?:(bottom(?![_a-zA-Z$\d])))|(?:(left(?![_a-zA-Z$\d])))|(?:(right(?![_a-zA-Z$\d])))|(?:(log(?![_a-zA-Z$\d])))|(?:(delete(?![_a-zA-Z$\d])))|(?:(dev(?![_a-zA-Z$\d])))|(?:(and(?![_a-zA-Z$\d])))|(?:(or(?![_a-zA-Z$\d])))|(?:(not(?![_a-zA-Z$\d])))|(?:(isn'?t(?![_a-zA-Z$\d])))|(?:(is(?![_a-zA-Z$\d])))|(?:(hasn'?t(?![_a-zA-Z$\d])))|(?:(has(?![_a-zA-Z$\d])))|(?:(any(?![_a-zA-Z$\d])))|(?:(all(?![_a-zA-Z$\d])))|(?:(between(?![_a-zA-Z$\d])))|(?:(true(?![_a-zA-Z$\d])))|(?:(false(?![_a-zA-Z$\d])))|(?:(null(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*milliseconds(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*millisecond(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*seconds(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*second(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*minutes(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*minute(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hours(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hour(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*min(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*hr(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*ms(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*s(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*m(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*h(?![_a-zA-Z$\d])))|(?:(\d+(?:\.\d+)?\s*px(?![_a-zA-Z$\d])))|(?:(--- note:\s*))|(?:(- +note: +))|(?:((?:!=)))|(?:((?:==)))|(?:((?:>=)))|(?:((?:<=)))|(?:((?:\.\.\.)))|(?:((?:\.\.)))|(?:((?:=)))|(?:((?:>)))|(?:((?:<)))|(?:((?:\+)))|(?:((?:\-)))|(?:((?:\/)))|(?:((?:%)))|(?:((?:\*)))|(?:((?:\^)))|(?:((?:!)))|(?:((?::)))|(?:(\.\s*[a-z][_a-zA-Z$][_a-zA-Z$\d]*))|(?:((?:'s)))|(?:((?:\.)))|(?:((?:,)))|(?:((?:\()))|(?:((?:\))))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:")))|(?:((?:\$\()))|(?:(\d+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*))|(?:(\s+)))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["keyword"], when: /import(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /test(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /suite(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /define(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /browser(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /behavior(?![_a-zA-Z$\d])/ },
                        { goto: "js_definition", highlight: "keyword", tag: ["keyword"], when: /javascript(?![_a-zA-Z$\d])/ },
                        { goto: "js_definition", highlight: "keyword", tag: ["keyword"], when: /js(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /must(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /mustn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /try(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /load(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /globally(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /now(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /range(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /stop(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /app(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /skip(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /before(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /after(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /next(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /every(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /tab(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /popup(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /dialog(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /download(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /network(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /navigation(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /within(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /new(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /from(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /session(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /incognito(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /timer(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /verify(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /can'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /can(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /by(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /wait(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /navigate(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /back(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /forward(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /reload(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /click(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /type(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /hover(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /drag(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scroll(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /find(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /close(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /resize(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /upload(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /clear(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /press(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /focus(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /blur(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /unfocus(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /restart(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /double(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /middle(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /top(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /bottom(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /left(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /right(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /log(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /delete(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /dev(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /isn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /is(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /hasn'?t(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /has(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /any(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /all(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /between(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![_a-zA-Z$\d])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*milliseconds(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*millisecond(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*seconds(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*second(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*minutes(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*minute(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hours(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hour(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*min(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*hr(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*ms(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*s(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*m(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*h(?![_a-zA-Z$\d])/ },
                        { before: true, goto: "dimension", highlight: "keyword", tag: ["keyword"], when: /\d+(?:\.\d+)?\s*px(?![_a-zA-Z$\d])/ },
                        { goto: "comment_multline.span", highlight: "comment", tag: ["comment_open"], when: /--- note:\s*/ },
                        { goto: "comment_inline.span", highlight: "comment", tag: ["comment_marker"], when: /- +note: +/ },
                        { highlight: "keyword", tag: ["l_neq"], when: "!=" },
                        { highlight: "keyword", tag: ["l_eqeq"], when: "==" },
                        { highlight: "keyword", tag: ["l_gteq"], when: ">=" },
                        { highlight: "keyword", tag: ["l_lteq"], when: "<=" },
                        { highlight: "keyword", tag: ["l_spread"], when: "..." },
                        { highlight: "keyword", tag: ["l_concat"], when: ".." },
                        { tag: ["l_eq"], when: "=" },
                        { highlight: "keyword", tag: ["l_gt"], when: ">" },
                        { highlight: "keyword", tag: ["l_lt"], when: "<" },
                        { highlight: "keyword", tag: ["l_add"], when: "+" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-" },
                        { highlight: "keyword", tag: ["l_div"], when: "/" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*" },
                        { highlight: "keyword", tag: ["l_exp"], when: "^" },
                        { highlight: "keyword", tag: ["l_exc"], when: "!" },
                        { highlight: "keyword", tag: ["l_col"], when: ":" },
                        { before: true, goto: "reserved_escape", when: /\.\s*[a-z][_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { highlight: "keyword", tag: ["l_possessive"], when: "'s" },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," },
                        { highlight: "delimiter", inset: 1, tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lcurly"], when: "{" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rcurly"], when: "}" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lbrack"], when: "[" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rbrack"], when: "]" },
                        { goto: "string.span", highlight: "string", tag: ["dquote"], when: "\"" },
                        { goto: "selector.span", highlight: "keyword", tag: ["selector_open"], when: "$(" },
                        { highlight: "number", tag: ["digits"], when: /\d+/ },
                        { tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { tag: ["ws"], when: /\s+/ }
                    ]
                },
                string: {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { goto: "string.span", highlight: "string", tag: ["dquote"], when: "\"" }
                    ]
                },
                "string.span": {
                    regex: /(?:(?:(\\[\\\/bnrft]))|(?:(\\"))|(?:(\\u[A-Fa-f\d]{4}))|(?:(\\.))|(?:([^"\\]+))|(?:((?:"))))/ym,
                    rules: [
                        { highlight: "constant", tag: ["escaped"], when: /\\[\\\/bnrft]/ },
                        { tag: ["quoteEscape"], when: /\\"/ },
                        { highlight: "constant", tag: ["escaped"], when: /\\u[A-Fa-f\d]{4}/ },
                        { tag: ["badEscape"], when: /\\./ },
                        { highlight: "string", tag: ["string"], when: /[^"\\]+/ },
                        { highlight: "string", pop: 1, tag: ["dquote"], when: "\"" }
                    ]
                },
                "string.start": {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { goto: "string.span", highlight: "string", tag: ["dquote"], when: "\"" }
                    ]
                },
                "string.stop": {
                    regex: /(?:(?:((?:"))))/ym,
                    rules: [
                        { highlight: "string", pop: 1, tag: ["dquote"], when: "\"" }
                    ]
                },
                whitespace: {
                    regex: /(?:(?:(\s+)))/ym,
                    rules: [
                        { tag: ["ws"], when: /\s+/ }
                    ]
                }
            }
        }
    }
    constructor(){}
}

export default grammar;