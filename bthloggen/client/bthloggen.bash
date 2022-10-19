#!/usr/bin/env bash 

#
# A template for creating command line scripts taking options, commands
# and arguments.
#
# Exit values:
#  0 on success
#  1 on failure
#

#
# A globale variable for the name of the script
#
SCRIPT=$( basename "$0" )

#
# Current version of the script
#
VERSION="1.0.0"

#
# Set environment and use defaults if defined
#
DBWEBB_HOST=$(head -n 1 server.txt)
DBWEBB_PORT=${DBWEBB_PORT:-1337}

#
# Message to display for usage and help 
#
function usage 
{
    local txt=( 
        ""
        " Utility $SCRIPT for sending request to the server."
        " Usage: $SCRIPT [options] <command> [arguments]."
        ""
        " Commands available:"
        "    url                                      Get url to view the server in browser."
        "    view                                     List all entries."
        "    view url <url>                           View all entries containing <url>."
        "    view ip <ip>                             View all entries containing <ip>."
        "    use <server>                             Sets the servername (localhost or service name)."  
        "    view month <month>                       Shows data that contains the given month <month>."
        "    view day <day>                           Shows data that contains the given day <day>."
        "    view time <time>                         Shows data that contains the given time <time>."
        "    view day <day> time=<time>               Shows data that contains the given day <day> at the time <time>."
        "    view month <month> day <day> time=<time> Shows data that contains the given month <month> on the day <day> at the time <time>."

        ""
        " Options:"
        "    --help, -h          Display the menu."
        "    --version, -v       Display the current version."
        "    --count, -c         Display the number of rows returned."
        ""
    )
    printf "%s\n" "${txt[@]}"
}

#
# Message to display when bad usage
# Gets an argument or mot, e,g badUsage "Options/command not recognized." or badUsage
#
function badUsage
{
    local message=" $1"
    local txt=(
        ""
        " For an overview of the command, execute:"
        " ./$SCRIPT --help, -h"
        ""
    )

    [[ $message ]] && echo "$message"
    printf '%s\n' "${txt[@]}"
}

#
# Message to display for version
#
function version
{
    local txt=(
        ""
        " $SCRIPT version $VERSION"
        ""
    )
    printf "%s\n" "${txt[@]}"
}

#
# count func
#
function count
{
    if [[ "$2" = "view" ]]
    then
        if [[ "$3" = "url" ]]
        then
            echo ""
            curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?url=$4"  | jq '. | length' && echo
            exit 0
        elif [[ "$3" = "ip" ]]
        then
            echo ""
            curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?ip=$4"  | jq '. | length' && echo
            exit 0
        elif [[ "$3" = "month" ]]
        then
            if [[ "$5" = "day" && "$7" = "time" ]]
            then
                n=$8
                if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
                then
                    echo ""
                    curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?month=$4&day=$6&time=$8"  | jq '. | length' && echo
                    exit 0
                else 
                    echo ""
                    echo "Wrong format. try e.g, -c view month Aug day 12 time 14 or view month Aug day 12 time 13:37"
                    echo ""
                    exit 1
                fi
            else
                echo ""
                curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?month=$4" | jq '. | length' && echo
                exit 0
            fi
        elif [[ "$3" = "day" ]]
        then
            if [[ "$5" = "time" ]]
            then
                n=$6
                if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
                then
                    echo ""
                    curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?day=$4&time=$6"  | jq '. | length' && echo
                    exit 0
                else 
                    echo ""
                    echo "Wrong format. try e.g, -c view day 12 time 14 or view day 12 time 13:37"
                    echo ""
                    exit 1
                fi
            else
                curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?day=$4" | jq '. | length' && echo 
                exit 0
            fi
        elif [[ "$3" = "time" ]]
        then
            n=$4
            if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
            then
                echo ""
                curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data?time=$4"  | jq '. | length' && echo
                exit 0
            else 
                echo ""
                echo "Wrong format. try e.g, view time 14 or view time 13:37"
                echo ""
                exit 1
            fi
        fi
        if [[ -z "$4" ]]
        then
            echo ""
            curl -s "http://$DBWEBB_HOST:$DBWEBB_PORT/data"  | jq '. | length' && echo
            exit 0
        fi
        badUsage "Options/command not reconized."
        exit 1  
    fi
    badUsage "Options/command not reconized."
    exit 1  
}

#
# url func
#
function app-url
{
    echo ""
    echo "http://$DBWEBB_HOST:$DBWEBB_PORT"
    echo ""
    exit 0
}

#
# view func
#
function app-view
{
    if [[ "$1" = "url" ]]
    then
        curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?url=$2" | jq '.' 
        exit 0
    elif [[ "$1" = "ip" ]]
    then
        curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?ip=$2" | jq '.' 
        exit 0
    elif [[ "$1" = "month" ]]
    then
        if [[ "$3" = "day" && "$5" = "time" ]]
        then
            n=$6
            if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
            then
                echo ""
                curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?month=$2&day=$4&time=$6"  | jq '.'
                exit 0
            else 
                echo ""
                echo "Wrong format. try e.g, view month Aug day 12 time 14 or view month Aug day 12 time 13:37"
                echo ""
                exit 1
            fi
        else
            curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?month=$2" | jq '.' 
            exit 0
        fi
    elif [[ "$1" = "day" ]]
    then
        if [[ "$3" = "time" ]]
        then
            n=$4
            if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
            then
                echo ""
                curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?day=$2&time=$4"  | jq '.'
                exit 0
            else 
                echo ""
                echo "Wrong format. try e.g, view day 12 time 14 or view day 12 time 13:37"
                echo ""
                exit 1
            fi
        else
            curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?day=$2" | jq '.' 
            exit 0
        fi
    elif [[ "$1" = "time" ]]
    then
        n=$2
        if [[ "${#n}" -eq 2 || "${#n}" -eq 5 ]]
        then
            echo ""
            curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data?time=$2"  | jq '.'
            exit 0
        else 
            echo ""
            echo "Wrong format. try e.g, view time 14 or view time 13:37"
            echo ""
            exit 1
        fi
    else 
        curl "http://$DBWEBB_HOST:$DBWEBB_PORT/data" | jq '.' 
        exit 0
    fi
}

#
# use func
#
function app-use
{
    
    if [[ $1 ]]
    then
        echo "$1" >server.txt
        echo "Server is now: $1"
        exit 0
    fi  
    badUsage "Options/command not reconized."
    exit 1  
}


#
# Checks arguments that are send into the script
# Uses while-loop and case-state to catch different commands and arguments.
#
while (( $#))
do 
    case "$1" in
        --help | -h)
            usage
            exit 0
        ;;

        --version | -v)
            version
            exit 0
        ;;

        --count | -c)
            count "$@"
            exit 0
        ;;
    # more code
        url       \
        | view   \
        | use   )           
            command=$1       
            shift               #  We present our command as one collection         
            app-"$command" "$@"    #  if we get a match, we call a function app-$command $*
            exit 0              #  Where $command = command_name (e.g, app-commit) and $* is the list of arguments
        ;;

        *)
            badUsage "Options/command not reconized."
            exit 1
        ;;
    esac
done

badUsage
exit 1
