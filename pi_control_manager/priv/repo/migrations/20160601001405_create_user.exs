defmodule PiCntrlMngr.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :admin, :boolean, default: false, null: false
      add :password_hash, :string

      timestamps
    end

  end
end
