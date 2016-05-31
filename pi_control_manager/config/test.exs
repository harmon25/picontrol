use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :pi_control_manager, PiCntrlMngr.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :pi_control_manager, PiCntrlMngr.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "pi_control_test",
  hostname: "172.17.0.2",
  pool: Ecto.Adapters.SQL.Sandbox
