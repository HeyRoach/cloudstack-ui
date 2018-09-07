Config Guide
============

See the example of a config.json [ConfigExample](https://github.com/bwsw/cloudstack-ui/blob/master/src/config/config-example.json)  

### Default domain URL

Domain URL used to fill the 'Domain' field in the login form

    "defaultDomain": "domain"

### Session Refresh Interval

You can set interval for updating the session (_in seconds_):

```
  "sessionRefreshInterval": 60
```

### Extensions

Please check [Wiki](https://github.com/bwsw/cloudstack-ui/wiki/Plugins) for extension configuration options.

### VM Colors

The set of colors for virtual machines in hexadecimal format. You can specify any colors you like.
```
 "vmColors": [
    { "value": "#F44336" },
    { "value": "#E91E63" },
    { "value": "#9C27B0" },
    { "value": "#673AB7" },
    { "value": "#3F51B5" }
 ]
```

### Security Group Templates

Predefined templates for security groups. You can define your own security groups that will be available for all users by default. Format:

    "securityGroupTemplates": [
      {
        "id": "templateTCP",
        "name": "TCP Permit All",
        "description": "Permits all TPC traffic",
        "preselected": false,
        "ingressrule": [
          {
            "ruleid": "templateTCP-rule-ingress",
            "protocol": "tcp",
            "startport": 1,
            "endport": 65535,
            "cidr": "0.0.0.0/0"
          }
        ],
        "egressrule": [
          {
            "ruleid": "templateTCP-rule-egress",
            "protocol": "tcp",
            "startport": 1,
            "endport": 65535,
            "cidr": "0.0.0.0/0"
          }
        ]
      },
      {
        "id": "templateICMP",
        "name": "ICMP Permit Egress",
        "description": "Permits all egress ICMP traffic",
        "preselected": true,
        "ingressrule": [],
        "egressrule": [
          {
            "ruleid": "templateICMP-rule-egress",
            "icmpcode": -1,
            "icmptype": -1,
            "protocol": "icmp",
            "cidr": "0.0.0.0/0"
          }
        ]
      }
    ]

Parameters:

* id: a unique identifier
* name
* description
* preselected (true or false) - specifies whether network rules from this template will be automatically applied for newly created virtual machines
* ingress and egress rules (ingressrule and egressrule respectively):
   * ruleid: a unique identifier
   * protocol: either 'tcp', 'udp' or 'icmp'
   * cidr: subnet mask (e.g. 0.0.0.0/0)
   * For TCP and UDP: startport and endport
   * For ICMP: icmpcode and icmptype

### Image Groups

You can define groups for sorting installation sources (templates and ISOs). 

Image group has a required `id` parameter and an optional translations parameter. Translations should be localized for used languages. If there are no translations defined for the template group, group's ID will be used.

For example,

```
"imageGroups": [
    {
      "id": "id-234",
      "translations": {
        "ru": "Имя группы",
        "en": "Group Name"
      }
    }
]
```

### Default First Day Of Week

Allows you to predefine the setting of the first day in the app. Possible values: 
- 0 - sunday
- 1 - monday (default value)

For example,

```
"defaultFirstDayOfWeek": 0
```

### Default Interface Language

Allows you to predefine the setting of the app interface language. Possible values: 
- "en" (default value)
- "ru"

For example, 

```
"defaultInterfaceLanguage": "en"
```

### Default Time Format

Allows you to predefine the setting of the time format. Possible values:
- "auto" - value depends on the interface language (default value)
- "hour12" - 12-hour time
- "hour24" - 24-hour time

For example, 

```
"defaultTimeFormat": "hour24",
```

### Default Theme

Preferred color theme for the app. Available themes are:

```
"blue-red"
"indigo-pink"
```
Is not specified, blue-red one is used.

```
 "defaultTheme": "blue-red"
```

### Session Timeout

Number of minutes a user's session should stay active. After this time passes the user is
logged out. 

Defaults value: `30` (minutes).

You can set it to `0` to turn this off, although in this case the session is likely to expire on the server side.

```
 "sessionTimeout": 30
```

### Allow Reordering Sidebar

A boolean value which allows or forbids a user to reorder links in the main sidebar. 

```
 "allowReorderingSidebar": false
```

### Configure Sidenav

Allows you to predefine the order and visibility of menu items. The order of the menu items is determined by the order of the elements in the array. The VMS menu item can not be made invisible, the visibility property will be ignored.
For configuration, you must specify all menu items and the "allowReorderingSidebar" parameter must be true.

For example (default values),

```
"allowReorderingSidebar": true,
"configureSidenav": [
    { "id": "VMS" },
    { "id": "VOLUMES", "visible": true },
    { "id": "TEMPLATES", "visible": true },
    { "id": "SNAPSHOTS", "visible": true },
    { "id": "SGS", "visible": true },
    { "id": "EVENTS", "visible": true },
    { "id": "SSH", "visible": true },
    { "id": "ACCOUNTS", "visible": true },
    { "id": "SETTINGS", "visible": true }
  ]
```

### Custom Compute Offering Restrictions

In this sections you can specify limits for custom compute offerings in the following format:

```
  "customComputeOfferingRestrictions": [
      {
        "offeringId": "3890f81e-62aa-4a50-971a-f066223d623d",
        "cpunumber": {
          "min": 2,
          "max": 8
        },
        "cpuspeed": {
          "min": 1000,
          "max": 3500
        },
        "memory": {
          "min": 512,
          "max": 8192
        }
      }
    ]
```
    
Any of these parameters may be left unspecified, in which case default values will be used.
Default values:

```
  cpunumber: {
      min: 1,
      max: Number.POSITIVE_INFINITY
    },
    cpuspeed: {
      min: 1000,
      max: Number.POSITIVE_INFINITY
    },
    memory: {
      min: 512,
      max: Number.POSITIVE_INFINITY
    }
```


### Default Compute Offering

For custom compute offerings there can be predefined offering parameters: number of CPUs, speed of CPU and/or memory. For example,

```
"defaultComputeOffering": {
   "031a55bb-5d6b-4336-ab93-d5dead28a887": {
	   "offering": "3890f81e-62aa-4a50-971a-f066223d623d",
	   "customOfferingParams": {
	      "cpuNumber": 2,
	      "cpuSpeed": 1000,
	      "memory": 1024
	   }
	}
}
```

### Offering Compatibility Policy

You can set a type of comparing and ignoring VM tags, when changing service offering from one cluster to service offering from another for VM:

```
"offeringCompatibilityPolicy": {
  "offeringChangePolicy": "exactly-match",
  "offeringChangePolicyIgnoreTags": ["t1"]
}
```

Possible values for offeringChangePolicy:
-  'contains-all',
-  'exactly-match',
-  'no-restrictions' (default value)

### Compute Offering Classes

In this section you can specify classes for service offerings in the following format:

```
 "computeOfferingClasses": [
    {
      "id": "classId-1",
      "name": {
        "ru": "Имя класса - 1",
        "en": "Class name - 1"
      },
      "description": {
        "ru": "Описание класса - 1",
        "en": "Class description - 1"
      },
      "computeOfferings": [
        "9c81af12-f15b-41f0-9dec-2a837e1dec29"
      ]
    },
    {
      "id": "classId-2",
      "name": {
        "ru": "Имя класса - 2",
        "en": "Class name - 2"
      },
      "description": {
        "ru": "Описание класса - 2",
        "en": "Class description - 2"
      },
      "computeOfferings": [
        "9c81af12-f15b-41f0-9dec-2a837e1dec29"
      ]
    }
  ]
```
    
Each classes should have a unique id, name, description and list of service offering ids, which belong to this class. Name and description should be localized for used languages.


### Disk Offering Parameters

This configuration allows a user to set parameters of Disk Offerings that will be shown in Disk Offerings Table.
Possible values:
-  displaytext
-  disksize
-  created
-  storagetype
-  provisioningtype
-  iscustomized
-  miniops
-  maxiops

All possible values will be by default.
For example,

```
"diskOfferingParameters": [
  "displaytext",
  "disksize",
]
```

### Offering Availability

In this section you can specify which offerings will be available for which zones. Format:

    "offeringAvailability": {
      "filterOfferings": true,
      "zones": {
        "zoneId": {
          "diskOfferings": ["offeringId1", "offeringId2"],
          "computeOfferings": ["offeringId3", "offeringId4"]
        }
      }
    }

If filterOfferings is set to false, all offerings will be available for all zones.
List of available diskOfferings will be in a Storage creation dialog.
List of customOfferings available will be in a VM creation dialog.

Please check [Wiki](https://github.com/bwsw/cloudstack-ui/wiki/Plugins) for extension configuration options.