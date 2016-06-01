defmodule PiCntrlMngr.User do
  use PiCntrlMngr.Web, :model

  schema "users" do
    field :name, :string
    field :email, :string
    field :admin, :boolean, default: false
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(model, params \\ %{}) do
   model
    |> cast(params, [:name, :password, :email, :admin])
    |> validate_required([:name, :password])
  end

  def add_user_changeset(model, params) do
    model
    |> changeset(params)
    |> cast(params, ~w(password), [])
    |> validate_length(:password, min: 6, max: 100)
    |> validate_length(:name, min: 2, max: 40)
    |> put_pass_hash()
  end


  defp put_pass_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
      put_change(changeset, :password_hash, Comeonin.Bcrypt.hashpwsalt(pass))
      _ ->
      changeset
    end
  end
end
