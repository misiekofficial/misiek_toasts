local hasFocus = false
local ready = false

-- Function to send NUI message for toast
function sendToast(title, description, timeout, color, variant, radius, className, endContent)
    SendNUIMessage({
        action = "toast",
        data = {
            title = title,
            description = description,
            timeout = timeout or 5000,
            color = color or "default", -- default color [default | primary | secondary | success | danger | warning | info]
            variant = variant or "flat", -- default variant [solid | bordered | flat]
            radius = radius or "md", -- default radius [none | sm | md | lg, full]
            className = className or "", -- default className,
        }
    })
end

-- Function to send NUI message for toast placement
function sendToastPlacement(placement)
    SendNUIMessage({
        action = "toastPlacement",
        data = {
            placement = placement
        }
    })
end


RegisterNetEvent('showToast')
AddEventHandler('showToast', function(data)
    sendToast(data.title, data.description, data.timeout, data.color)
end)

RegisterNetEvent('setToastPlacement')
AddEventHandler('setToastPlacement', function(placement)
    sendToastPlacement(placement)
end)

RegisterNUICallback('ready', function(data, cb)
    ready = true

    cb('ok')
end)

RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false)

    hasFocus = false

    cb('ok')
end)

--[[CreateThread(function()
    -- Example usage of sending a toast with a React button component as endContent
    Wait(1000)  -- Wait for 1 second before showing the toast
    sendToast("Hello World", "This is a test toast message!", 2000, "default", "flat", "md", "")  -- Show a toast with a custom React button as endContent
end)]]

RegisterCommand('toasts', function()
    hasFocus = not hasFocus

    SetNuiFocus(hasFocus, hasFocus)
end, false)