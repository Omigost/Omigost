import { create } from '@storybook/theming';

const defaultTheme = {
    primaryFont: "Raleway, sans-serif",
    colors: {
        background: "#F7F7F7",
        primary: "#EB3349",
        secondary: "#F45C43",
        palette: [
            "#47A0ED",
        ],
        primaryText: "#1B0000",
        accent: "#474747",
        primaryGradient: "linear-gradient(to right, #EB3349, #F45C43)",
        lightAccent: "white",
    },
    fontSize: {
        S: "0.7vw",
        default: "1vw",
        M: "1.2vw",
        L: "1.5vw",
        XL: "2vw",
        XXL: "3vw",
    },
};

export default create({
    base: 'light',

    colorPrimary: defaultTheme.colors.primary,
    colorSecondary: defaultTheme.colors.primary,

    // UI
    appBg: "white",
    appContentBg: "white",
    appBorderColor: defaultTheme.colors.accent,
    appBorderRadius: 4,

    // Typography
    fontBase: defaultTheme.primaryFont,
    fontCode: 'monospace',

    // Text colors
    textColor: defaultTheme.colors.primaryText,
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: defaultTheme.colors.primaryGradient,
    barSelectedColor: defaultTheme.colors.primary,
    barBg: "white",

    // Form colors
    inputBg: 'white',
    inputBorder: 'silver',
    inputTextColor: 'black',
    inputBorderRadius: 4,

    brandTitle: 'Omigost',
    brandImage: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjQ2bW0iCiAgIGhlaWdodD0iNTNtbSIKICAgdmlld0JveD0iMCAwIDE2Mi45OTIwMyAxODcuNzk1MTciCiAgIGlkPSJzdmc3MTMzIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuOTEgcjEzNzI1IgogICBzb2RpcG9kaTpkb2NuYW1lPSJvbWlnb3N0X3NpbmdsZS5zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM3MTM1Ij4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgwLjQyNjExMTYsMC42MTQ4MTE2MywtMC42MTQ4MTE2MywwLjQyNjExMTYsOTAuMzY1Niw4NTMuMTIyNDIpIgogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDI5MiIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQyOTgiCiAgICAgICB4MT0iMjcuNDk5OTk2IgogICAgICAgeTE9Ijg5LjY0Mjg0NSIKICAgICAgIHgyPSI3My45Mjg1NjYiCiAgICAgICB5Mj0iMTI4LjU3MTQxIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIC8+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQyOTIiPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojNWI3ZjY5O3N0b3Atb3BhY2l0eToxOyIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBpZD0ic3RvcDQyOTQiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM3NmU5MGE7c3RvcC1vcGFjaXR5OjEiCiAgICAgICAgIG9mZnNldD0iMSIKICAgICAgICAgaWQ9InN0b3A0Mjk2IiAvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaW5rc2NhcGU6Y29sbGVjdD0iYWx3YXlzIgogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50NDI2NSIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDQyNzEiCiAgICAgICB4MT0iNzEuNzIwODI1IgogICAgICAgeTE9IjQ3LjQ2NDQwOSIKICAgICAgIHgyPSIyMjAuMjEzMjMiCiAgICAgICB5Mj0iNDIuOTE4NzI0IgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAuNDI2MTExNiwwLjYxNDgxMTYzLC0wLjYxNDgxMTYzLDAuNDI2MTExNiw0My4xNjg2NCw4OTEuODA5NDkpIiAvPgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpbmtzY2FwZTpjb2xsZWN0PSJhbHdheXMiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MjY1Ij4KICAgICAgPHN0b3AKICAgICAgICAgc3R5bGU9InN0b3AtY29sb3I6I2ViMzM0OTtzdG9wLW9wYWNpdHk6MTsiCiAgICAgICAgIG9mZnNldD0iMCIKICAgICAgICAgaWQ9InN0b3A0MjY3IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZjQ1YzQzO3N0b3Atb3BhY2l0eToxIgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIGlkPSJzdG9wNDI2OSIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0iYmFzZSIKICAgICBwYWdlY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyY29sb3I9IiM2NjY2NjYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMS4wIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIxLjQiCiAgICAgaW5rc2NhcGU6Y3g9IjcyLjEzNzMzOSIKICAgICBpbmtzY2FwZTpjeT0iMjE0Ljg4MDY1IgogICAgIGlua3NjYXBlOmRvY3VtZW50LXVuaXRzPSJweCIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5NzEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTcxMzgiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPjwvZGM6dGl0bGU+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAsLTg2NC41NjcwNykiPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOnVybCgjbGluZWFyR3JhZGllbnQ0MjcxKTtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6I2ViMzM0OTtzdHJva2Utd2lkdGg6MS45OTk5OTg4MTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eTowIgogICAgICAgZD0ibSAxNy4zMjYzOTYsOTMyLjM2MTY3IGMgLTcuOTAwNzQzMywxNi4xMTU1NCAtMi4wMjk0MzEsNDguNTY2MzMgMTEuMTk1MDYzLDY3LjI0NzI5IDEzLjIyNDUxLDE4LjY4MDk0IDI3LjE2NDA0MSwyNi44Mzc4NCA0OS4xODk4MjEsMzMuMzMxMTQgNy40OTcyOCwyLjE5OTcgMjAuNjU3NTQsMi41NTEgMjYuMDU3MjMsMi4yOTY1IDUuMzk5NjgsLTAuMjU0NCAxMi4yNzU4MywtMC41OTkzIDIzLjMxODE2LC01Ljk5NzEgNy4wMzc1OSwtMy4yMDE1IDExLjM4MjU3LC02LjQ1NjcgMTcuMDA1NzEsLTkuNjc4MiAtNy42MzExNywwLjUzNzIgLTEzLjU5MDYyLDAuODgxMSAtMjEuMzg2NDUsLTAuMzQ3MyAtNy43OTU4MiwtMS4yMjg1IC0xMy4yNDYzNSwtMi43MjY1IC0yMS40NjMwOSwtNi43MDIgLTguMjE2NzQsLTMuOTc1NSAtMTQuODUzMTksLTcuOTQ3NiAtMjIuMjYwMzMsLTE3LjM3MjM5IC0xNS4zNjkxMiwtMTYuNTA3NzMgLTEyLjYyMDA3LC0zOC4xNDg5MiAtMTUuMjY3NzYsLTUyLjY5Mjk0IC0xLjgzNTA5LC04LjExNzI2IC00LjcwNTk0LC0xMy43MzUxMiAtMTAuMTU2NywtMTcuNjYyNzYgLTEyLjU4NDYzMSwtOS4wNjAyMyAtMjguMzMwOTExLC04LjUzNzc4IC0zNi4yMzE2NTQsNy41Nzc3NiB6IgogICAgICAgaWQ9InBhdGg0MTg2LTgiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJ6emN6Y2N6emNjY3oiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS45OTk5OTg4MTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAxNi43NDUxNzksOTM2LjM4MTA4IGMgLTcuOTAwNzQyMywxNi4xMTU1MyAtMi4wMjk0MjUsNDguNTY2MzMgMTEuMTk1MDcsNjcuMjQ3MzIgMTMuMjI0NSwxOC42ODA5IDI3LjE2NDAzMSwyNi44Mzc4IDQ5LjE4OTgxMSwzMy4zMzExIDcuNDk3MywyLjE5OTcgMjAuNjU3NTUsMi41NTEgMjYuMDU3MjQsMi4yOTY1IDUuMzk5NjgsLTAuMjU0NCAxMi4yNzU4MiwtMC41OTkzIDIzLjMxODE3LC01Ljk5NzEgNy4wMzc1OCwtMy4yMDE1IDExLjM4MjU3LC02LjQ1NjcgMTcuMDA1NzEsLTkuNjc4MiAtNy42MzExOCwwLjUzNzMgLTEzLjU5MDYyLDAuODgxMSAtMjEuMzg2NDUsLTAuMzQ3MyAtNy43OTU4MywtMS4yMjg0IC0xMy4yNDYzNiwtMi43MjY1IC0yMS40NjMxLC02LjcwMiBDIDkyLjQ0NDksMTAxMi41NTU5IDg1LjgwODQ1LDEwMDguNTgzOSA3OC40MDEzLDk5OS4xNTkwMiA2My4wMzIxOCw5ODIuNjUxMjkgNjUuNzgxMjIsOTYxLjAxMDEgNjMuMTMzNTQsOTQ2LjQ2NjA3IDYxLjI5ODQ1LDkzOC4zNDg4MSA1OC40Mjc2LDkzMi43MzA5NSA1Mi45NzY4Myw5MjguODAzMzEgNDAuMzkyMjA5LDkxOS43NDMwNyAyNC42NDU5MTksOTIwLjI2NTUzIDE2Ljc0NTE3OSw5MzYuMzgxMDggWiIKICAgICAgIGlkPSJwYXRoNDE4NiIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9Inp6Y3pjY3p6Y2NjeiIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50NDI5OCk7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuOTk5OTk4ODE7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MCIKICAgICAgIGQ9Im0gNDkuMTk1NjIsOTI2LjA4ODc3IGMgLTAuOTMzODYsLTEwLjQzMzQ2IDEuNTYxODksLTI0LjQ1Mjk2IDcuMDc2NTQsLTM5LjM1NTc1IEwgNTEuNDA0MSw4ODUuMTY1MyBjIC02LjI0OTQ3LDE2LjA5NjczIC0xMC41MDM0NjEsMjcuMjY2NDEgLTE0LjE2NzY5MSwzNy41MjI3OCAzLjIwMzg3LDAuNTE0OTYgOS4xNDg5NzEsMS4xNTMxNCAxMS45NTkyMTEsMy40MDA2OSB6IgogICAgICAgaWQ9InBhdGg0Mjc1LTkiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjk5OTk5ODgxO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDUwLjkxMTYxLDkyNy4yMDU2NSBjIC0wLjkwMDM5LC0xMC42NDE3OSAxLjgwNzU4LC0yNS4zNjQyMSA3LjUzNzg0LC00MC42MDE1MiBsIC00Ljk3ODg2LC0xLjU3MzQ5IGMgLTYuNDg5NTEsMTYuNDU5NjUgLTEwLjMyODYyLDI3LjAxMTc1IC0xNC4xMzgwNDEsMzcuNDk3NjYgMy4yNzk1OSwwLjUwODE4IDguNzEyMDkxLDIuMzk5MDIgMTEuNTc5MDYxLDQuNjc3MzUgeiIKICAgICAgIGlkPSJwYXRoNDI3NSIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogIDwvZz4KPC9zdmc+Cg=="
});