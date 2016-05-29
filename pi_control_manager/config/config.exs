# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :pi_control_manager,
  ecto_repos: [PiCntrlMngr.Repo]

# Configures the endpoint
config :pi_control_manager, PiCntrlMngr.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NjfH6ZsvZuFCMrtFa+2vP4Hr9kyaPE+5cAaWZOUZGW88UBQ11yFdGUmQkx4ko00k",
  render_errors: [view: PiCntrlMngr.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PiCntrlMngr.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
