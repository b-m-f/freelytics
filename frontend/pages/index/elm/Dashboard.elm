module DashBoard exposing (main) 

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Array
import Table

import Json.Decode exposing (Decoder,decodeValue, field, string, list, map2, map, int)


decoder : Decoder Metric
decoder =
  map2 Metric
    (field "URL" string )
    (field "TimesVisited" int)

dataDecoder: Decoder MetricCollection
dataDecoder =
  map identity
    (field "data" (list decoder))
-- MAIN


main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



-- MODEL

type alias Metric = {
  url: String,
  times_visited: Int
 }


type alias MetricCollection = List Metric


type alias Model =
  {
    data: (Result Json.Decode.Error MetricCollection),
    tableState: Table.State
  }


init : Json.Decode.Value -> (Model, Cmd Msg)
init flags =
  let
    model =
      { 
       data = decodeValue dataDecoder flags
      , tableState = Table.initialSort "Year"
      }
  in
    (model, Cmd.none)



-- UPDATE


type Msg =
   NewTableState Table.State


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    NewTableState newState ->
      ({model | tableState = newState}, Cmd.none)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none



-- VIEW


config : Table.Config Metric Msg
config =
  Table.config
    { toId = .url
    , toMsg = NewTableState
    , columns =
        [
          Table.stringColumn "URL" .url
        , Table.intColumn "Hits" .times_visited
        ]
    }


view : Model -> Html Msg
view model =
  case model.data of
    Result.Ok data->
      div []
         [
            Table.view config model.tableState data
         ]
    Err e -> 
      div [] [text (Json.Decode.errorToString e)] 




